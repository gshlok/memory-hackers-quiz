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
        "relative border border-primary bg-card",
        glow && "shadow-[0_0_10px_rgba(255,255,255,0.2)]",
        className
      )}
    >
      {/* Simplified terminal header */}
      <div className="border-b border-primary px-4 py-2 flex items-center gap-2 bg-card">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <div className="w-3 h-3 rounded-full bg-primary" />
          <div className="w-3 h-3 rounded-full bg-primary" />
        </div>
        <div className="flex-1 text-center text-xs text-primary font-mono">
          TERMINAL
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">{children}</div>
    </div>
  );
}