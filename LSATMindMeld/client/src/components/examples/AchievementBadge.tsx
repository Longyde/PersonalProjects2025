import { AchievementBadge } from "../AchievementBadge";
import { Trophy, Target, Zap, Crown } from "lucide-react";

export default function AchievementBadgeExample() {
  return (
    <div className="p-6 grid gap-4 max-w-2xl sm:grid-cols-2">
      <AchievementBadge
        icon={Trophy}
        title="First Steps"
        description="Complete your first practice question"
        unlocked={true}
        unlockedAt={new Date("2024-01-15")}
      />
      <AchievementBadge
        icon={Target}
        title="Perfect Score"
        description="Answer 10 questions correctly in a row"
        unlocked={true}
        unlockedAt={new Date("2024-01-20")}
      />
      <AchievementBadge
        icon={Zap}
        title="Speed Demon"
        description="Complete a timed challenge in under 2 minutes"
        unlocked={false}
      />
      <AchievementBadge
        icon={Crown}
        title="LSAT Master"
        description="Reach Level 50"
        unlocked={false}
      />
    </div>
  );
}
