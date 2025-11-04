import { StudyModeCard } from "../StudyModeCard";
import { Lightbulb, BookOpen, PuzzleIcon } from "lucide-react";

export default function StudyModeCardExample() {
  return (
    <div className="p-6 space-y-4 max-w-md">
      <StudyModeCard
        icon={Lightbulb}
        title="Logical Reasoning"
        description="Master arguments, assumptions, and logical fallacies"
        progress={65}
        color="bg-primary/10 text-primary"
        onClick={() => console.log("Logical Reasoning clicked")}
      />
      <StudyModeCard
        icon={BookOpen}
        title="Reading Comprehension"
        description="Analyze complex passages and extract key information"
        progress={42}
        color="bg-success/10 text-success"
        onClick={() => console.log("Reading Comprehension clicked")}
      />
      <StudyModeCard
        icon={PuzzleIcon}
        title="Logic Games"
        description="Solve analytical reasoning puzzles"
        progress={0}
        locked={true}
        color="bg-warning/10 text-warning"
      />
    </div>
  );
}
