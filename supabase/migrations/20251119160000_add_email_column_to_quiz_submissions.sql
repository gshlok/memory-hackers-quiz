-- Add email column to quiz_submissions table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'quiz_submissions' 
    AND column_name = 'email'
  ) THEN
    ALTER TABLE public.quiz_submissions 
    ADD COLUMN email TEXT;
  END IF;
END $$;

-- Create index for email column for better performance
CREATE INDEX IF NOT EXISTS idx_quiz_submissions_email ON public.quiz_submissions(email);

-- Update existing records to split user_name into user_name and email
-- This is for backward compatibility with existing data
UPDATE public.quiz_submissions 
SET email = split_part(user_name, '||', 2),
    user_name = split_part(user_name, '||', 1)
WHERE user_name LIKE '%||%';