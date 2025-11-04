import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { motion } from "framer-motion";

type TimerDisplayProps = {
  initialSeconds: number;
  onTimeUp?: () => void;
  onTick?: (remaining: number) => void;
};

export function TimerDisplay({ initialSeconds, onTimeUp, onTick }: TimerDisplayProps) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds <= 0) {
      onTimeUp?.();
      return;
    }

    const interval = setInterval(() => {
      setSeconds((prev) => {
        const newValue = prev - 1;
        onTick?.(newValue);
        return newValue;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, onTimeUp, onTick]);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const isWarning = seconds <= 30 && seconds > 10;
  const isCritical = seconds <= 10;

  return (
    <motion.div
      animate={isCritical ? { scale: [1, 1.05, 1] } : {}}
      transition={{ duration: 0.5, repeat: isCritical ? Infinity : 0 }}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono font-semibold ${
        isCritical
          ? "bg-destructive text-destructive-foreground"
          : isWarning
          ? "bg-warning/20 text-warning-foreground"
          : "bg-muted"
      }`}
      data-testid="display-timer"
    >
      <Clock className="h-4 w-4" />
      <span className="text-lg">
        {String(minutes).padStart(2, "0")}:{String(remainingSeconds).padStart(2, "0")}
      </span>
    </motion.div>
  );
}
