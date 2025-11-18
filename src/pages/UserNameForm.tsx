import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TerminalCard } from "@/components/ui/terminal-card";
import { GlitchText } from "@/components/GlitchText";
import { ArrowLeft, User } from "lucide-react";
import { toast } from "sonner";

const UserNameForm = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userName.trim()) {
      toast.error("Please enter your name");
      return;
    }
    
    // Store user name in localStorage and navigate to quiz
    localStorage.setItem("quizUserName", userName.trim());
    navigate("/quiz");
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

      <div className="relative z-10 container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="absolute top-4 left-4 text-primary hover:text-primary/80"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          BACK
        </Button>

        <TerminalCard className="max-w-md w-full" glow>
          <div className="space-y-6">
            <div className="text-center">
              <User className="w-16 h-16 text-primary mx-auto mb-4 animate-neon-pulse" />
              <h1 className="text-3xl font-bold mb-2">
                <GlitchText>ENTER YOUR NAME</GlitchText>
              </h1>
              <p className="text-muted-foreground font-mono text-sm">
                {'>'} IDENTIFICATION REQUIRED
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-primary font-mono">
                  NAME
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your name"
                  className="bg-input border-primary/30 text-foreground font-mono
                           focus:border-primary focus:shadow-[0_0_10px_rgba(0,255,0,0.2)]"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 
                         shadow-[0_0_20px_rgba(0,255,0,0.3)] font-mono"
                disabled={loading}
              >
                START QUIZ
              </Button>
            </form>

            <div className="pt-4 border-t border-primary/30">
              <p className="text-xs text-muted-foreground font-mono text-center">
                {'>'} YOUR NAME WILL BE RECORDED WITH YOUR SCORE
              </p>
            </div>
          </div>
        </TerminalCard>
      </div>
    </div>
  );
};

export default UserNameForm;