import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TerminalCard } from "@/components/ui/terminal-card";
import { GlitchText } from "@/components/GlitchText";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Shield, Loader2, ArrowLeft } from "lucide-react";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate input
    try {
      loginSchema.parse({ email, password });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
        return;
      }
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        // Check if user has admin role
        const { data: roleData, error: roleError } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", data.user.id)
          .eq("role", "admin")
          .single();

        if (roleError || !roleData) {
          await supabase.auth.signOut();
          toast.error("Access denied: Admin privileges required");
          return;
        }

        toast.success("Access granted");
        navigate("/admin/dashboard");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
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
              <Shield className="w-16 h-16 text-primary mx-auto mb-4 animate-neon-pulse" />
              <h1 className="text-3xl font-bold mb-2">
                <GlitchText>ADMIN ACCESS</GlitchText>
              </h1>
              <p className="text-muted-foreground font-mono text-sm">
                {'>'} AUTHENTICATION_REQUIRED
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-primary font-mono">
                  EMAIL
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@system.io"
                  className="bg-input border-primary/30 text-foreground font-mono
                           focus:border-primary focus:shadow-[0_0_10px_rgba(0,255,0,0.2)]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-primary font-mono">
                  PASSWORD
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
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
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    AUTHENTICATING...
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4 mr-2" />
                    LOGIN
                  </>
                )}
              </Button>
            </form>

            <div className="pt-4 border-t border-primary/30">
              <p className="text-xs text-muted-foreground font-mono text-center">
                {'>'} AUTHORIZED_PERSONNEL_ONLY
              </p>
            </div>
          </div>
        </TerminalCard>
      </div>
    </div>
  );
};

export default AdminLogin;