import { forwardRef } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NeonButtonProps extends ButtonProps {
  neonColor?: "purple" | "cyan" | "green";
}

const NeonButton = forwardRef<HTMLButtonElement, NeonButtonProps>(
  ({ className, neonColor = "purple", children, ...props }, ref) => {
    const neonColors = {
      purple: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40",
      cyan: "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40",
      green: "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg shadow-green-500/25 hover:shadow-green-500/40",
    };

    return (
      <Button
        ref={ref}
        className={cn(
          "relative overflow-hidden text-white font-semibold transition-all duration-300 hover:scale-105 neon-text",
          neonColors[neonColor],
          className
        )}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

NeonButton.displayName = "NeonButton";

export { NeonButton };
