import { StatCard } from "../StatCard";
import { Target, TrendingUp, Clock, Award } from "lucide-react";

export default function StatCardExample() {
  return (
    <div className="p-6 grid gap-4 max-w-4xl sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        icon={Target}
        label="Accuracy"
        value="87%"
        color="text-success"
        trend={{ value: "5%", positive: true }}
      />
      <StatCard
        icon={TrendingUp}
        label="Questions Solved"
        value={234}
        color="text-primary"
        trend={{ value: "12", positive: true }}
      />
      <StatCard
        icon={Clock}
        label="Avg. Speed"
        value="1.2 min"
        color="text-warning"
        trend={{ value: "0.3 min", positive: false }}
      />
      <StatCard
        icon={Award}
        label="Achievements"
        value={18}
        color="text-chart-3"
      />
    </div>
  );
}
