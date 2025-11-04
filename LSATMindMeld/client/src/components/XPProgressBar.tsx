import { Progress } from "@/components/ui/progress";
import { Trophy } from "lucide-react";

type XPProgressBarProps = {
  currentXP: number;
  targetXP: number;
  level: number;
};

export function XPProgressBar({ currentXP, targetXP, level }: XPProgressBarProps) {
  const progress = (currentXP / targetXP) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-xp-gradient-from to-xp-gradient-to rounded-full">
            <Trophy className="h-4 w-4 text-white" />
            <span className="text-sm font-semibold text-white">Level {level}</span>
          </div>
        </div>
        <span className="text-sm font-medium text-muted-foreground">
          {currentXP} / {targetXP} XP
        </span>
      </div>
      <div className="relative">
        <Progress value={progress} className="h-3 bg-muted" />
        <div
          className="absolute inset-0 h-3 rounded-full bg-gradient-to-r from-xp-gradient-from to-xp-gradient-to transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
