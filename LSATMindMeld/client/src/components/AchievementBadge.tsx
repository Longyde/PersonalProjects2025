import { Card } from "@/components/ui/card";
import { LucideIcon, Lock } from "lucide-react";
import { motion } from "framer-motion";

type AchievementBadgeProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  unlocked: boolean;
  unlockedAt?: Date;
};

export function AchievementBadge({
  icon: Icon,
  title,
  description,
  unlocked,
  unlockedAt,
}: AchievementBadgeProps) {
  return (
    <Card
      className={`p-4 transition-all ${
        unlocked ? "hover-elevate active-elevate-2 cursor-pointer" : "opacity-60"
      }`}
      data-testid={`badge-achievement-${title.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`relative flex items-center justify-center w-12 h-12 rounded-full ${
            unlocked
              ? "bg-gradient-to-br from-achievement-gold to-yellow-500"
              : "bg-muted"
          }`}
        >
          {unlocked ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Icon className="h-6 w-6 text-white" />
            </motion.div>
          ) : (
            <Lock className="h-6 w-6 text-muted-foreground" />
          )}
        </div>
        <div className="flex-1 space-y-1">
          <h4 className="font-semibold text-sm">{title}</h4>
          <p className="text-xs text-muted-foreground">{description}</p>
          {unlocked && unlockedAt && (
            <p className="text-xs text-muted-foreground">
              Unlocked {unlockedAt.toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
