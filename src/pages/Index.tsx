import { Button } from "@/components/ui/button";
import { TerminalCard } from "@/components/ui/terminal-card";
import { GlitchText } from "@/components/GlitchText";
import { useNavigate } from "react-router-dom";
import { Terminal, Zap, Brain } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

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

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
        {/* ASCII Logo */}
        <div className="mb-8 text-primary font-mono text-xs md:text-sm animate-flicker">
          <pre className="text-center leading-tight">
            {`
   ██████╗ ██╗   ██╗██╗███████╗    ███████╗██╗   ██╗███████╗████████╗███████╗███╗   ███╗
  ██╔═══██╗██║   ██║██║╚══███╔╝    ██╔════╝╚██╗ ██╔╝██╔════╝╚══██╔══╝██╔════╝████╗ ████║
  ██║   ██║██║   ██║██║  ███╔╝     ███████╗ ╚████╔╝ ███████╗   ██║   █████╗  ██╔████╔██║
  ██║▄▄ ██║██║   ██║██║ ███╔╝      ╚════██║  ╚██╔╝  ╚════██║   ██║   ██╔══╝  ██║╚██╔╝██║
  ╚██████╔╝╚██████╔╝██║███████╗    ███████║   ██║   ███████║   ██║   ███████╗██║ ╚═╝ ██║
   ╚══▀▀═╝  ╚═════╝ ╚═╝╚══════╝    ╚══════╝   ╚═╝   ╚══════╝   ╚═╝   ╚══════╝╚═╝     ╚═╝
`}
          </pre>
        </div>

        {/* Main Card */}
        <TerminalCard className="max-w-4xl w-full mb-8" glow>
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Terminal className="w-8 h-8 text-primary animate-neon-pulse" />
              <h1 className="text-3xl md:text-5xl font-bold">
                <GlitchText>ACCESS TERMINAL</GlitchText>
              </h1>
            </div>

            <div className="text-lg text-muted-foreground font-mono space-y-2">
              <p className="animate-flicker">{'>'} INITIALIZING QUIZ PROTOCOL...</p>
              <p className="text-primary">{'>'} TOPIC: Dynamic Memory Allocation & Linked Lists</p>
              <p className="text-accent">{'>'} DIFFICULTY: ADAPTIVE [EASY → HARD]</p>
              <p className="text-matrix-green">{'>'} QUESTIONS: 15 TOTAL</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button
                size="lg"
                onClick={() => navigate("/user")}
                className="relative bg-primary text-primary-foreground hover:bg-primary/90 
                         font-mono text-lg px-8 py-6 group overflow-hidden
                         shadow-[0_0_20px_rgba(0,255,0,0.3)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  START QUIZ
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent 
                              opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
            </div>
          </div>
        </TerminalCard>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl w-full">
          <TerminalCard className="text-center">
            <Brain className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2 text-primary">Adaptive Testing</h3>
            <p className="text-sm text-muted-foreground font-mono">
              Questions scale from easy to hard, testing your mastery progressively.
            </p>
          </TerminalCard>

          <TerminalCard className="text-center">
            <Terminal className="w-12 h-12 text-accent mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2 text-accent">Real Code</h3>
            <p className="text-sm text-muted-foreground font-mono">
              Practical C programming examples with memory allocation concepts.
            </p>
          </TerminalCard>

          <TerminalCard className="text-center">
            <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2 text-primary">Instant Results</h3>
            <p className="text-sm text-muted-foreground font-mono">
              Get immediate feedback and detailed analytics on your performance.
            </p>
          </TerminalCard>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-muted-foreground font-mono text-sm">
          <p className="animate-terminal-cursor inline-block">
            {'>'} SYSTEM READY_
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;