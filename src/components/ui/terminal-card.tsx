import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface TerminalCardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}

export function TerminalCard({ children, className, glow = false }: TerminalCardProps) {
  return (
    <div
      className={cn(
        "relative border-2 border-primary/30 bg-card/50 backdrop-blur-sm",
        "before:absolute before:inset-0 before:border before:border-primary/10",
        "before:animate-pulse before:pointer-events-none",
        glow && "shadow-[0_0_30px_rgba(0,255,0,0.2)]",
        className
      )}
    >
      {/* Terminal header */}
      <div className="border-b border-primary/30 px-4 py-2 flex items-center gap-2 bg-card/80">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-destructive/80" />
          <div className="w-3 h-3 rounded-full bg-accent/80" />
          <div className="w-3 h-3 rounded-full bg-primary/80" />
        </div>
        <div className="flex-1 text-center text-xs text-muted-foreground font-mono">
          TERMINAL_INTERFACE.EXE
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">{children}</div>
    </div>
  );
}