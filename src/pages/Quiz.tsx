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

interface Question {
  id: string;
  question_text: string;
  options: string[];
  correct_option: number;
  difficulty: string;
}

const Quiz = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [sessionId, setSessionId] = useState<string>("");

  useEffect(() => {
    loadQuestions();
    createSession();
  }, []);

  const createSession = async () => {
    const fingerprint = `session_${Date.now()}_${Math.random()}`;
    const { data, error } = await supabase
      .from("user_sessions")
      .insert({ session_fingerprint: fingerprint })
      .select()
      .single();

    if (error) {
      console.error("Error creating session:", error);
      toast.error("Failed to start quiz session");
      return;
    }

    if (data) {
      setSessionId(data.id);
    }
  };

  const loadQuestions = async () => {
    try {
      const { data, error } = await supabase
        .from("questions")
        .select("*")
        .order("difficulty", { ascending: true });

      if (error) throw error;

      if (!data || data.length === 0) {
        toast.error("No questions available. Please contact admin.");
        navigate("/");
        return;
      }

      // Get 5 easy, 5 medium, 5 hard and map to correct type
      const easy = data.filter((q) => q.difficulty === "easy").slice(0, 5);
      const medium = data.filter((q) => q.difficulty === "medium").slice(0, 5);
      const hard = data.filter((q) => q.difficulty === "hard").slice(0, 5);

      const mappedQuestions = [...easy, ...medium, ...hard].map(q => ({
        ...q,
        options: q.options as unknown as string[]
      }));

      setQuestions(mappedQuestions);
    } catch (error) {
      console.error("Error loading questions:", error);
      toast.error("Failed to load questions");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (optionIndex: number) => {
    setAnswers({ ...answers, [questions[currentIndex].id]: optionIndex });
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

    // Save response
    const { error: sessionError } = await supabase
      .from("user_sessions")
      .update({ completed_at: new Date().toISOString() })
      .eq("id", sessionId);

    if (sessionError) {
      console.error("Error updating session:", sessionError);
    }

    const { error } = await supabase.from("responses").insert({
      session_id: sessionId,
      answers: answers,
      score: score,
    });

    if (error) {
      console.error("Error saving response:", error);
      toast.error("Failed to save your answers");
      return;
    }

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
  const selectedAnswer = answers[currentQuestion.id];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-primary font-mono">
              <GlitchText>QUIZ_TERMINAL</GlitchText>
            </h1>
            <div className="text-right">
              <p className="text-sm text-muted-foreground font-mono">
                QUESTION {currentIndex + 1} / {questions.length}
              </p>
              <p className="text-xs text-accent font-mono uppercase">
                DIFFICULTY: {currentQuestion.difficulty}
              </p>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <TerminalCard className="max-w-3xl mx-auto mb-8" glow>
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground font-mono mb-2">
                {'>'} QUERY:
              </p>
              <h2 className="text-xl md:text-2xl font-bold text-foreground whitespace-pre-wrap">
                {currentQuestion.question_text}
              </h2>
            </div>

            <div>
              <p className="text-sm text-muted-foreground font-mono mb-4">
                {'>'} SELECT_OPTION:
              </p>
              <RadioGroup value={selectedAnswer?.toString()} onValueChange={(v) => handleAnswer(parseInt(v))}>
                <div className="space-y-3">
                  {currentQuestion.options.map((option, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center space-x-3 p-4 rounded border-2 transition-all cursor-pointer
                        ${selectedAnswer === idx 
                          ? 'border-primary bg-primary/10 shadow-[0_0_15px_rgba(0,255,0,0.2)]' 
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
            className="border-2 border-primary/50 text-primary hover:bg-primary/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            PREVIOUS
          </Button>

          {currentIndex === questions.length - 1 ? (
            <Button
              onClick={handleSubmit}
              disabled={Object.keys(answers).length < questions.length}
              className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-[0_0_20px_rgba(0,255,255,0.3)]"
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
            <p className="text-sm text-muted-foreground font-mono mb-3">
              {'>'} ANSWER_STATUS:
            </p>
            <div className="flex flex-wrap gap-2">
              {questions.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-10 h-10 rounded border-2 font-mono text-sm transition-all
                    ${idx === currentIndex 
                      ? 'border-primary bg-primary text-primary-foreground shadow-[0_0_10px_rgba(0,255,0,0.3)]' 
                      : answers[q.id] !== undefined
                        ? 'border-accent text-accent'
                        : 'border-border text-muted-foreground'}`}
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