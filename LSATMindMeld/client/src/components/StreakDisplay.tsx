import { Flame } from "lucide-react";
import { motion } from "framer-motion";

type StreakDisplayProps = {
  streak: number;
  compact?: boolean;
};

export function StreakDisplay({ streak, compact = false }: StreakDisplayProps) {
  if (compact) {
    return (
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-br from-warning/20 to-warning/10 rounded-full border border-warning/20">
        <Flame className="h-4 w-4 text-warning" />
        <span className="text-sm font-semibold text-foreground">{streak}</span>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="relative"
        >
          <div className="absolute inset-0 bg-warning/20 rounded-full blur-xl" />
          <div className="relative flex items-center justify-center w-16 h-16 bg-gradient-to-br from-warning to-orange-500 rounded-full">
            <Flame className="h-8 w-8 text-white" />
          </div>
        </motion.div>
        <div>
          <div className="text-3xl font-display font-bold">{streak}</div>
          <div className="text-sm text-muted-foreground">Day Streak</div>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        {streak > 0 ? `Keep it up! Study today to maintain your streak.` : `Start your streak by studying today!`}
      </p>
    </div>
  );
}
