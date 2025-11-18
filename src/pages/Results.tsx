import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TerminalCard } from "@/components/ui/terminal-card";
import { GlitchText } from "@/components/GlitchText";
import { CheckCircle2, XCircle, Home, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total } = location.state || { score: 0, total: 30 };
  const [showConfetti, setShowConfetti] = useState(false);

  const percentage = Math.round((score / total) * 100);
  const passed = percentage >= 60;

  useEffect(() => {
    if (passed) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [passed]);

  const getMessage = () => {
    if (percentage >= 90) return "EXCEPTIONAL PERFORMANCE";
    if (percentage >= 75) return "EXCELLENT WORK";
    if (percentage >= 60) return "GOOD JOB";
    return "NEEDS IMPROVEMENT";
  };

  const getStatusColor = () => {
    if (percentage >= 90) return "text-accent";
    if (percentage >= 60) return "text-primary";
    return "text-destructive";
  };

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

      {/* Confetti effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-primary animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random()}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
        {/* Main Results Card */}
        <TerminalCard className="max-w-2xl w-full mb-8" glow>
          <div className="text-center space-y-6">
            {/* Status Icon */}
            <div className="flex justify-center">
              {passed ? (
                <CheckCircle2 className="w-24 h-24 text-primary animate-neon-pulse" />
              ) : (
                <XCircle className="w-24 h-24 text-destructive animate-flicker" />
              )}
            </div>

            {/* Title */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                <GlitchText>
                  {passed ? "ACCESS GRANTED" : "ACCESS DENIED"}
                </GlitchText>
              </h1>
              <p className={`text-xl font-mono ${getStatusColor()} animate-flicker`}>
                {'>'} {getMessage()}
              </p>
            </div>

            {/* Score Display */}
            <div className="py-8">
              <div className="text-6xl md:text-8xl font-bold text-primary animate-neon-pulse mb-2">
                {score}/{total}
              </div>
              <div className={`text-3xl md:text-4xl font-mono ${getStatusColor()}`}>
                {percentage}%
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 py-6 border-t border-b border-primary/30">
              <div>
                <p className="text-sm text-muted-foreground font-mono mb-1">CORRECT</p>
                <p className="text-2xl font-bold text-primary">{score}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-mono mb-1">INCORRECT</p>
                <p className="text-2xl font-bold text-destructive">{total - score}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-mono mb-1">ACCURACY</p>
                <p className="text-2xl font-bold text-accent">{percentage}%</p>
              </div>
            </div>

            {/* Feedback Message */}
            <div className="bg-card/50 border border-primary/30 rounded p-4">
              <p className="text-muted-foreground font-mono text-sm leading-relaxed">
                {passed
                  ? "{'>'} QUIZ COMPLETED SUCCESSFULLY. Your understanding of Dynamic Memory Allocation and Linked Lists has been verified. Keep up the excellent work!"
                  : "{'>'} QUIZ COMPLETED. Consider reviewing the topics and trying again. Focus on understanding memory management concepts and pointer operations."}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                onClick={() => navigate("/quiz")}
                className="bg-primary text-primary-foreground hover:bg-primary/90 
                         shadow-[0_0_20px_rgba(0,255,0,0.3)]"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                RETRY QUIZ
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/")}
                className="border-2 border-primary/50 text-primary hover:bg-primary/10"
              >
                <Home className="w-5 h-5 mr-2" />
                HOME
              </Button>
            </div>
          </div>
        </TerminalCard>

        {/* System Message */}
        <div className="mt-8 text-center text-muted-foreground font-mono text-sm">
          <p className="animate-terminal-cursor">
            {'>'} SYSTEM_READY_FOR_NEW_SESSION_
          </p>
        </div>
      </div>
    </div>
  );
};

export default Results;