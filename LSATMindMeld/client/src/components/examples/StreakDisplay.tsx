import { StreakDisplay } from "../StreakDisplay";

export default function StreakDisplayExample() {
  return (
    <div className="p-6 space-y-8">
      <StreakDisplay streak={7} />
      <StreakDisplay streak={0} />
      <div className="flex gap-3">
        <StreakDisplay streak={14} compact />
        <StreakDisplay streak={3} compact />
      </div>
    </div>
  );
}
