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
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!userName.trim()) {
            toast.error("Please enter your name");
            return;
        }

        if (!email.trim()) {
            toast.error("Please enter your email");
            return;
        }

        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address");
            return;
        }

        // Store user name and email in localStorage and navigate to quiz
        localStorage.setItem("quizUserName", userName.trim());
        localStorage.setItem("quizUserEmail", email.trim());
        navigate("/quiz");
    };

    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            <div className="relative z-10 container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
                <Button
                    variant="ghost"
                    onClick={() => navigate("/")}
                    className="absolute top-4 left-4 text-primary hover:text-primary/80"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    BACK
                </Button>

                <TerminalCard className="max-w-md w-full">
                    <div className="space-y-6">
                        <div className="text-center">
                            <User className="w-16 h-16 text-primary mx-auto mb-4" />
                            <h1 className="text-3xl font-bold mb-2">
                                <GlitchText>ENTER YOUR DETAILS</GlitchText>
                            </h1>
                            <p className="text-primary font-mono text-sm">
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
                                    className="bg-input border border-primary text-foreground font-mono"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-primary font-mono">
                                    EMAIL
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="bg-input border border-primary text-foreground font-mono"
                                    required
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 
                         font-mono"
                                disabled={loading}
                            >
                                START QUIZ
                            </Button>
                        </form>

                        <div className="pt-4 border-t border-primary">
                            <p className="text-xs text-primary font-mono text-center">
                                {'>'} YOUR DETAILS WILL BE RECORDED WITH YOUR SCORE
                            </p>
                        </div>
                    </div>
                </TerminalCard>
            </div>
        </div>
    );
};

export default UserNameForm;