import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlitchTextProps {
  children: ReactNode;
  className?: string;
  animate?: boolean;
}

export function GlitchText({ children, className, animate = true }: GlitchTextProps) {
  return (
    <span
      className={cn(
        "relative inline-block",
        animate && "hover:animate-glitch",
        className
      )}
      style={{
        textShadow: animate
          ? "0 0 2px hsl(var(--primary))"
          : undefined,
      }}
    >
      {children}
    </span>
  );
}