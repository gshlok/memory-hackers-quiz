import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Plus, Edit2, Trash2, Save, X } from "lucide-react";
import { z } from "zod";

const questionSchema = z.object({
  question_text: z.string().min(10, "Question must be at least 10 characters"),
  options: z.array(z.string().min(1, "Option cannot be empty")).length(4, "Must have exactly 4 options"),
  correct_option: z.number().min(0).max(3),
  difficulty: z.enum(["easy", "medium", "hard"]),
});

interface Question {
  id: string;
  question_text: string;
  options: string[];
  correct_option: number;
  difficulty: string;
  is_language_specific: boolean;
}

const QuestionsManager = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const [formData, setFormData] = useState({
    question_text: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    correct_option: 0,
    difficulty: "easy" as "easy" | "medium" | "hard",
    is_language_specific: false,
  });

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      const { data, error } = await supabase
        .from("questions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      const mappedQuestions = (data || []).map(q => ({
        ...q,
        options: q.options as unknown as string[]
      }));
      
      setQuestions(mappedQuestions);
    } catch (error) {
      console.error("Error loading questions:", error);
      toast.error("Failed to load questions");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      question_text: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      correct_option: 0,
      difficulty: "easy",
      is_language_specific: false,
    });
    setEditingId(null);
    setShowAddForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const options = [
      formData.option1,
      formData.option2,
      formData.option3,
      formData.option4,
    ];

    try {
      questionSchema.parse({
        question_text: formData.question_text,
        options,
        correct_option: formData.correct_option,
        difficulty: formData.difficulty,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
        return;
      }
    }

    const questionData = {
      question_text: formData.question_text,
      options: JSON.stringify(options),
      correct_option: formData.correct_option,
      difficulty: formData.difficulty,
      is_language_specific: formData.is_language_specific,
    };

    try {
      if (editingId) {
        const { error } = await supabase
          .from("questions")
          .update(questionData)
          .eq("id", editingId);

        if (error) throw error;
        toast.success("Question updated successfully");
      } else {
        const { error } = await supabase
          .from("questions")
          .insert(questionData);

        if (error) throw error;
        toast.success("Question added successfully");
      }

      resetForm();
      loadQuestions();
    } catch (error: any) {
      console.error("Error saving question:", error);
      toast.error(error.message || "Failed to save question");
    }
  };

  const handleEdit = (question: Question) => {
    setFormData({
      question_text: question.question_text,
      option1: question.options[0] || "",
      option2: question.options[1] || "",
      option3: question.options[2] || "",
      option4: question.options[3] || "",
      correct_option: question.correct_option,
      difficulty: question.difficulty as "easy" | "medium" | "hard",
      is_language_specific: question.is_language_specific,
    });
    setEditingId(question.id);
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this question?")) return;

    try {
      const { error } = await supabase
        .from("questions")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast.success("Question deleted successfully");
      loadQuestions();
    } catch (error) {
      console.error("Error deleting question:", error);
      toast.error("Failed to delete question");
    }
  };

  if (loading) {
    return <div className="text-center text-muted-foreground font-mono">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Add Question Button */}
      {!showAddForm && (
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          ADD NEW QUESTION
        </Button>
      )}

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="border-2 border-primary/30 rounded p-6 bg-card/30">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-primary font-mono">
              {editingId ? "EDIT QUESTION" : "ADD NEW QUESTION"}
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetForm}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="text-primary font-mono">QUESTION TEXT</Label>
              <Textarea
                value={formData.question_text}
                onChange={(e) => setFormData({ ...formData, question_text: e.target.value })}
                placeholder="Enter the question..."
                className="bg-input border-primary/30 text-foreground font-mono min-h-[100px]"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((num) => (
                <div key={num}>
                  <Label className="text-primary font-mono">OPTION {num}</Label>
                  <Input
                    value={formData[`option${num}` as keyof typeof formData] as string}
                    onChange={(e) => setFormData({ ...formData, [`option${num}`]: e.target.value })}
                    placeholder={`Option ${num}`}
                    className="bg-input border-primary/30 text-foreground font-mono"
                    required
                  />
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-primary font-mono">CORRECT OPTION</Label>
                <Select
                  value={formData.correct_option.toString()}
                  onValueChange={(v) => setFormData({ ...formData, correct_option: parseInt(v) })}
                >
                  <SelectTrigger className="bg-input border-primary/30 text-foreground font-mono">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Option 1</SelectItem>
                    <SelectItem value="1">Option 2</SelectItem>
                    <SelectItem value="2">Option 3</SelectItem>
                    <SelectItem value="3">Option 4</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-primary font-mono">DIFFICULTY</Label>
                <Select
                  value={formData.difficulty}
                  onValueChange={(v: "easy" | "medium" | "hard") =>
                    setFormData({ ...formData, difficulty: v })
                  }
                >
                  <SelectTrigger className="bg-input border-primary/30 text-foreground font-mono">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                type="submit"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Save className="w-4 h-4 mr-2" />
                {editingId ? "UPDATE" : "CREATE"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
                className="border-2 border-primary/50 text-primary hover:bg-primary/10"
              >
                CANCEL
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-primary font-mono">
          EXISTING QUESTIONS ({questions.length})
        </h3>

        {questions.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground font-mono">
            No questions yet. Add your first question to get started.
          </div>
        ) : (
          questions.map((question) => (
            <div
              key={question.id}
              className="border-2 border-primary/30 rounded p-4 bg-card/30 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`px-2 py-1 text-xs font-mono rounded border ${
                        question.difficulty === "easy"
                          ? "border-primary/50 text-primary"
                          : question.difficulty === "medium"
                          ? "border-accent/50 text-accent"
                          : "border-destructive/50 text-destructive"
                      }`}
                    >
                      {question.difficulty.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-foreground font-mono mb-3">{question.question_text}</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {question.options.map((opt, idx) => (
                      <div
                        key={idx}
                        className={`p-2 rounded border ${
                          idx === question.correct_option
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border text-muted-foreground"
                        }`}
                      >
                        {idx + 1}. {opt}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(question)}
                    className="border-primary/50 text-primary hover:bg-primary/10"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(question.id)}
                    className="border-destructive/50 text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default QuestionsManager;