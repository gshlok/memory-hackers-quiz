import { Button } from "@/components/ui/button";
import { TerminalCard } from "@/components/ui/terminal-card";
import { GlitchText } from "@/components/GlitchText";
import { useNavigate } from "react-router-dom";
import { Terminal } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Simplified content */}
      <div className="relative z-10 container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
        {/* Simplified Logo */}
        <div className="mb-8 text-primary font-mono text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
            <GlitchText>MEMORY HACKERS</GlitchText>
          </h1>
          <p className="text-lg sm:text-xl text-primary font-mono">
            QUIZ SYSTEM
          </p>
        </div>

        {/* Main Card */}
        <TerminalCard className="max-w-4xl w-full mb-8">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Terminal className="w-8 h-8 text-primary" />
              <h1 className="text-3xl md:text-5xl font-bold">
                <GlitchText>ACCESS TERMINAL</GlitchText>
              </h1>
            </div>

            <div className="text-lg text-primary font-mono space-y-2">
              <p className="animate-flicker">{'>'} INITIALIZING QUIZ PROTOCOL...</p>
              <p>{'>'} TOPIC: Dynamic Memory Allocation & Linked Lists</p>
              <p>{'>'} DIFFICULTY: ADAPTIVE [EASY → HARD]</p>
              <p>{'>'} QUESTIONS: 30 TOTAL</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button
                size="lg"
                onClick={() => navigate("/user")}
                className="relative bg-primary text-primary-foreground hover:bg-primary/90 
                         font-mono text-lg px-8 py-6"
              >
                <span className="relative z-10 flex items-center gap-2">
                  START QUIZ
                </span>
              </Button>
            </div>
          </div>
        </TerminalCard>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl w-full">
          <TerminalCard className="text-center">
            <h3 className="text-xl font-bold mb-2 text-primary">Adaptive Testing</h3>
            <p className="text-sm text-primary font-mono">
              Questions scale from easy to hard, testing your mastery progressively.
            </p>
          </TerminalCard>

          <TerminalCard className="text-center">
            <h3 className="text-xl font-bold mb-2 text-primary">Real Code</h3>
            <p className="text-sm text-primary font-mono">
              Practical C programming examples with memory allocation concepts.
            </p>
          </TerminalCard>

          <TerminalCard className="text-center">
            <h3 className="text-xl font-bold mb-2 text-primary">Instant Results</h3>
            <p className="text-sm text-primary font-mono">
              Get immediate feedback and detailed analytics on your performance.
            </p>
          </TerminalCard>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-primary font-mono text-sm">
          <p className="animate-terminal-cursor inline-block">
            {'>'} SYSTEM READY_
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;