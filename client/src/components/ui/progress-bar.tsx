import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  className?: string;
  animated?: boolean;
  neonColor?: "purple" | "cyan" | "green";
}

export function ProgressBar({ 
  value, 
  className, 
  animated = true,
  neonColor = "purple" 
}: ProgressBarProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setDisplayValue(value);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setDisplayValue(value);
    }
  }, [value, animated]);

  const neonColors = {
    purple: "bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50",
    cyan: "bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/50",
    green: "bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg shadow-green-500/50",
  };

  return (
    <div className={cn("w-full bg-gray-700 rounded-full h-2", className)}>
      <div
        className={cn(
          "h-2 rounded-full transition-all duration-1000 ease-out",
          neonColors[neonColor]
        )}
        style={{ width: `${displayValue}%` }}
      />
    </div>
  );
}
