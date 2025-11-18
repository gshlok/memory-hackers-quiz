import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { TerminalCard } from "@/components/ui/terminal-card";
import { GlitchText } from "@/components/GlitchText";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LogOut, 
  Plus, 
  BarChart3, 
  Users, 
  FileText,
  Loader2
} from "lucide-react";
import { toast } from "sonner";
import QuestionsManager from "@/components/admin/QuestionsManager";
import AnalyticsDashboard from "@/components/admin/AnalyticsDashboard";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        toast.error("Please login first");
        navigate("/admin/login");
        return;
      }

      // Check admin role
      const { data: roleData, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .single();

      if (error || !roleData) {
        toast.error("Access denied: Admin privileges required");
        navigate("/");
        return;
      }

      setIsAdmin(true);
    } catch (error) {
      console.error("Auth check error:", error);
      navigate("/admin/login");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              <GlitchText>ADMIN_CONTROL_PANEL</GlitchText>
            </h1>
            <p className="text-muted-foreground font-mono text-sm">
              {'>'} SYSTEM_MANAGEMENT_INTERFACE
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="border-2 border-destructive/50 text-destructive hover:bg-destructive/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            LOGOUT
          </Button>
        </div>

        {/* Main Content */}
        <TerminalCard glow>
          <Tabs defaultValue="questions" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-card/50 border border-primary/30">
              <TabsTrigger 
                value="questions"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-mono"
              >
                <FileText className="w-4 h-4 mr-2" />
                QUESTIONS
              </TabsTrigger>
              <TabsTrigger 
                value="analytics"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-mono"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                ANALYTICS
              </TabsTrigger>
            </TabsList>

            <TabsContent value="questions" className="mt-6">
              <QuestionsManager />
            </TabsContent>

            <TabsContent value="analytics" className="mt-6">
              <AnalyticsDashboard />
            </TabsContent>
          </Tabs>
        </TerminalCard>
      </div>
    </div>
  );
};

export default AdminDashboard;