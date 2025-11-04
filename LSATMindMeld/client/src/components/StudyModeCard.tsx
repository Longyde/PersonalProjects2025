import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";

type StudyModeCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  progress: number;
  locked?: boolean;
  color: string;
  onClick?: () => void;
};

export function StudyModeCard({
  icon: Icon,
  title,
  description,
  progress,
  locked = false,
  color,
  onClick,
}: StudyModeCardProps) {
  return (
    <Card
      className={`p-6 hover-elevate active-elevate-2 cursor-pointer transition-all ${
        locked ? "opacity-50 grayscale" : ""
      }`}
      onClick={locked ? undefined : onClick}
      data-testid={`card-study-mode-${title.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex-1 space-y-2">
          <h3 className="font-display font-semibold text-lg">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
          {!locked && (
            <div className="space-y-1">
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-muted-foreground">{progress}% Complete</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
