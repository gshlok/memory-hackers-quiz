-- Add email column to quiz_submissions table
ALTER TABLE public.quiz_submissions 
ADD COLUMN IF NOT EXISTS email TEXT;

-- Create index for email column for better performance
CREATE INDEX IF NOT EXISTS idx_quiz_submissions_email ON public.quiz_submissions(email);

-- Update RLS policies to allow email column to be inserted
DROP POLICY IF EXISTS "Anyone can insert quiz submissions" ON public.quiz_submissions;
CREATE POLICY "Anyone can insert quiz submissions"
  ON public.quiz_submissions FOR INSERT
  WITH CHECK (true);

-- Update existing records to split user_name into user_name and email
-- This is for backward compatibility with existing data
UPDATE public.quiz_submissions 
SET email = split_part(user_name, '||', 2),
    user_name = split_part(user_name, '||', 1)
WHERE user_name LIKE '%||%';