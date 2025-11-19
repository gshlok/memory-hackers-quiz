import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TerminalCard } from "@/components/ui/terminal-card";
import { GlitchText } from "@/components/GlitchText";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, ArrowRight, ArrowLeft } from "lucide-react";
import { hardcodedQuestions as allQuestions, Question } from "@/data/questions";

const Quiz = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    // Get user name from localStorage
    const name = localStorage.getItem("quizUserName");
    if (!name) {
      toast.error("User name not found. Please start again.");
      navigate("/user");
      return;
    }
    setUserName(name);

    // Select 15 easy and 15 hard questions
    const easy = allQuestions.filter(q => q.difficulty === "easy");
    const hard = allQuestions.filter(q => q.difficulty === "hard");

    setQuestions([...easy, ...hard]);
    setLoading(false);
  }, [navigate]);

  const handleAnswer = (optionIndex: number) => {
    setAnswers(prev => ({ ...prev, [questions[currentIndex].id]: optionIndex }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length < questions.length) {
      toast.error("Please answer all questions before submitting");
      return;
    }

    // Calculate score
    let score = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correct_option) {
        score++;
      }
    });

    // Get email from localStorage
    const userEmail = localStorage.getItem("quizUserEmail");

    // Try to save to quiz_submissions table
    const { error } = await supabase.from("quiz_submissions").insert({
      user_name: userName,
      email: userEmail || null,
      score: score,
    });

    // If we get an error, it might be due to RLS, so we'll show a warning but continue
    if (error) {
      console.error("Error saving quiz submission:", error);
      // We'll still navigate to results even if we can't save to database
      toast.warning("Could not save your results to database, but you can still see your score.");
    } else {
      toast.success("Results saved successfully!");
    }

    // Clear user details from localStorage
    localStorage.removeItem("quizUserName");
    localStorage.removeItem("quizUserEmail");

    navigate("/results", { state: { score, total: questions.length } });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-primary font-mono animate-flicker">
            {'>'} DECRYPTING QUESTIONS...
          </p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return null;
  }

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const selectedAnswer = answers[currentQuestion.id] !== undefined ? answers[currentQuestion.id].toString() : "";

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-primary font-mono">
              <GlitchText>QUIZ_TERMINAL</GlitchText>
            </h1>
            <div className="text-right">
              <p className="text-sm text-primary font-mono">
                QUESTION {currentIndex + 1} / {questions.length}
              </p>
              <p className="text-xs text-primary font-mono uppercase">
                DIFFICULTY: {currentQuestion.difficulty}
              </p>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <TerminalCard className="max-w-3xl mx-auto mb-8">
          <div className="space-y-6">
            <div>
              <p className="text-sm text-primary font-mono mb-2">
                {'>'} QUERY:
              </p>
              <h2 className="text-xl md:text-2xl font-bold text-foreground whitespace-pre-wrap">
                {currentQuestion.question_text}
              </h2>
            </div>

            <div>
              <p className="text-sm text-primary font-mono mb-4">
                {'>'} SELECT_OPTION:
              </p>
              <RadioGroup value={selectedAnswer} onValueChange={(v) => handleAnswer(parseInt(v))}>
                <div className="space-y-3">
                  {currentQuestion.options.map((option, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center space-x-3 p-4 rounded border-2 transition-all cursor-pointer
                        ${selectedAnswer === idx.toString()
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50'}`}
                      onClick={() => handleAnswer(idx)}
                    >
                      <RadioGroupItem value={idx.toString()} id={`option-${idx}`} className="border-primary" />
                      <Label htmlFor={`option-${idx}`} className="flex-1 cursor-pointer font-mono">
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          </div>
        </TerminalCard>

        {/* Navigation */}
        <div className="flex justify-between max-w-3xl mx-auto">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="border border-primary text-primary hover:bg-primary/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            PREVIOUS
          </Button>

          {currentIndex === questions.length - 1 ? (
            <Button
              onClick={handleSubmit}
              disabled={Object.keys(answers).length < questions.length}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              SUBMIT QUIZ
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              NEXT
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>

        {/* Answer Summary */}
        <div className="mt-8 max-w-3xl mx-auto">
          <TerminalCard>
            <p className="text-sm text-primary font-mono mb-3">
              {'>'} ANSWER_STATUS:
            </p>
            <div className="flex flex-wrap gap-2">
              {questions.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-10 h-10 rounded border-2 font-mono text-sm transition-all
                    ${idx === currentIndex
                      ? 'border-primary bg-primary text-primary-foreground'
                      : answers[q.id] !== undefined
                        ? 'border-primary text-primary'
                        : 'border-border text-primary'}`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </TerminalCard>
        </div>
      </div>
    </div>
  );
};

export default Quiz;