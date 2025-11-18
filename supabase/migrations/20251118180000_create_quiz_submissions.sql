-- Create quiz_submissions table
CREATE TABLE public.quiz_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_name TEXT NOT NULL,
  score INTEGER NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on quiz_submissions table
ALTER TABLE public.quiz_submissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for quiz_submissions table
CREATE POLICY "Anyone can insert quiz submissions"
  ON public.quiz_submissions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view quiz submissions"
  ON public.quiz_submissions FOR SELECT
  USING (true);

-- Create indexes for performance
CREATE INDEX idx_quiz_submissions_submitted_at ON public.quiz_submissions(submitted_at);
CREATE INDEX idx_quiz_submissions_score ON public.quiz_submissions(score);

-- IMPORTANT: If you're still getting 401 errors, you may need to run this command in your Supabase SQL editor:
-- ALTER TABLE public.quiz_submissions DISABLE ROW LEVEL SECURITY;
-- This will allow anyone to insert and view records without authentication