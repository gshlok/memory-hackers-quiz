import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";

interface Analytics {
  totalSessions: number;
  completedSessions: number;
  averageScore: number;
  totalResponses: number;
}

const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState<Analytics>({
    totalSessions: 0,
    completedSessions: 0,
    averageScore: 0,
    totalResponses: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      // Get session stats
      const { data: sessions, error: sessionsError } = await supabase
        .from("user_sessions")
        .select("*");

      if (sessionsError) throw sessionsError;

      const totalSessions = sessions?.length || 0;
      const completedSessions = sessions?.filter((s) => s.completed_at).length || 0;

      // Get response stats
      const { data: responses, error: responsesError } = await supabase
        .from("responses")
        .select("score");

      if (responsesError) throw responsesError;

      const totalResponses = responses?.length || 0;
      const averageScore =
        totalResponses > 0
          ? responses.reduce((acc, r) => acc + r.score, 0) / totalResponses
          : 0;

      setAnalytics({
        totalSessions,
        completedSessions,
        averageScore,
        totalResponses,
      });
    } catch (error) {
      console.error("Error loading analytics:", error);
      toast.error("Failed to load analytics");
    } finally {
      setLoading(false);
    }
  };

  const exportCSV = async () => {
    try {
      const { data: responses, error } = await supabase
        .from("responses")
        .select("*, user_sessions(session_fingerprint, started_at, completed_at)")
        .order("submitted_at", { ascending: false });

      if (error) throw error;

      if (!responses || responses.length === 0) {
        toast.error("No data to export");
        return;
      }

      // Create CSV content
      const headers = ["Session ID", "Score", "Submitted At", "Started At", "Completed At"];
      const rows = responses.map((r: any) => [
        r.session_id,
        r.score,
        r.submitted_at,
        r.user_sessions?.started_at || "",
        r.user_sessions?.completed_at || "",
      ]);

      const csvContent = [
        headers.join(","),
        ...rows.map((row) => row.join(",")),
      ].join("\n");

      // Download CSV
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `quiz-results-${new Date().toISOString().split("T")[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);

      toast.success("CSV exported successfully");
    } catch (error) {
      console.error("Error exporting CSV:", error);
      toast.error("Failed to export data");
    }
  };

  if (loading) {
    return <div className="text-center text-muted-foreground font-mono">Loading analytics...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-6 bg-card/50 border-2 border-primary/30">
          <p className="text-sm text-muted-foreground font-mono mb-1">TOTAL SESSIONS</p>
          <p className="text-3xl font-bold text-primary">{analytics.totalSessions}</p>
        </Card>

        <Card className="p-6 bg-card/50 border-2 border-accent/30">
          <p className="text-sm text-muted-foreground font-mono mb-1">COMPLETED</p>
          <p className="text-3xl font-bold text-accent">{analytics.completedSessions}</p>
        </Card>

        <Card className="p-6 bg-card/50 border-2 border-primary/30">
          <p className="text-sm text-muted-foreground font-mono mb-1">TOTAL RESPONSES</p>
          <p className="text-3xl font-bold text-primary">{analytics.totalResponses}</p>
        </Card>

        <Card className="p-6 bg-card/50 border-2 border-accent/30">
          <p className="text-sm text-muted-foreground font-mono mb-1">AVG SCORE</p>
          <p className="text-3xl font-bold text-accent">
            {analytics.averageScore.toFixed(1)}/15
          </p>
        </Card>
      </div>

      {/* Completion Rate */}
      <Card className="p-6 bg-card/50 border-2 border-primary/30">
        <h3 className="text-xl font-bold text-primary font-mono mb-4">COMPLETION RATE</h3>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="h-8 bg-input rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                style={{
                  width: `${
                    analytics.totalSessions > 0
                      ? (analytics.completedSessions / analytics.totalSessions) * 100
                      : 0
                  }%`,
                }}
              />
            </div>
          </div>
          <div className="text-2xl font-bold text-primary">
            {analytics.totalSessions > 0
              ? Math.round((analytics.completedSessions / analytics.totalSessions) * 100)
              : 0}
            %
          </div>
        </div>
      </Card>

      {/* Export Button */}
      <div className="flex justify-end">
        <Button
          onClick={exportCSV}
          className="bg-accent text-accent-foreground hover:bg-accent/90"
        >
          <Download className="w-4 h-4 mr-2" />
          EXPORT CSV
        </Button>
      </div>

      {/* Performance Message */}
      <Card className="p-6 bg-card/50 border-2 border-primary/30">
        <p className="text-muted-foreground font-mono text-sm">
          {'>'} SYSTEM_STATUS: Analytics updated in real-time. Use the export feature to download
          detailed response data for further analysis.
        </p>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;