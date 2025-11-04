import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

type StatCardProps = {
  icon: LucideIcon;
  label: string;
  value: string | number;
  color?: string;
  trend?: {
    value: string;
    positive: boolean;
  };
};

export function StatCard({ icon: Icon, label, value, color = "text-primary", trend }: StatCardProps) {
  return (
    <Card className="p-4 md:p-6" data-testid={`card-stat-${label.toLowerCase().replace(/\s+/g, "-")}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2 flex-1">
          <p className="text-sm text-muted-foreground">{label}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl md:text-3xl font-display font-bold">{value}</p>
            {trend && (
              <span
                className={`text-xs font-medium ${
                  trend.positive ? "text-success" : "text-destructive"
                }`}
              >
                {trend.positive ? "+" : ""}{trend.value}
              </span>
            )}
          </div>
        </div>
        <div className={`p-2 md:p-3 rounded-lg bg-muted/50 ${color}`}>
          <Icon className="h-5 w-5 md:h-6 md:w-6" />
        </div>
      </div>
    </Card>
  );
}
