import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/StatCard";
import { AchievementBadge } from "@/components/AchievementBadge";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ArrowLeft, Target, TrendingUp, Clock, Award, Trophy, Zap, Crown, Star } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Progress() {
  const [, setLocation] = useLocation();
  const [achievements] = useState([
    {
      id: "1",
      icon: Trophy,
      title: "First Steps",
      description: "Complete your first practice question",
      unlocked: true,
      unlockedAt: new Date("2024-01-15"),
    },
    {
      id: "2",
      icon: Target,
      title: "Perfect Score",
      description: "Answer 10 questions correctly in a row",
      unlocked: true,
      unlockedAt: new Date("2024-01-20"),
    },
    {
      id: "3",
      icon: Zap,
      title: "Speed Demon",
      description: "Complete a timed challenge in under 2 minutes",
      unlocked: false,
    },
    {
      id: "4",
      icon: Star,
      title: "Dedicated Learner",
      description: "Maintain a 7-day streak",
      unlocked: true,
      unlockedAt: new Date("2024-01-22"),
    },
    {
      id: "5",
      icon: Crown,
      title: "LSAT Master",
      description: "Reach Level 50",
      unlocked: false,
    },
  ]);

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLocation("/")}
              data-testid="button-back"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-display font-bold">Your Progress</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="container px-4 py-8 space-y-8">
        <Tabs defaultValue="stats" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="stats" data-testid="tab-stats">Statistics</TabsTrigger>
            <TabsTrigger value="achievements" data-testid="tab-achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="stats" className="space-y-6 mt-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
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
                value={achievements.filter((a) => a.unlocked).length}
                color="text-chart-3"
              />
            </div>

            <div className="max-w-6xl mx-auto space-y-4">
              <h3 className="text-lg font-display font-semibold">Performance by Section</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <StatCard
                  icon={Target}
                  label="Logical Reasoning"
                  value="92%"
                  color="text-primary"
                />
                <StatCard
                  icon={Target}
                  label="Reading Comp"
                  value="81%"
                  color="text-success"
                />
                <StatCard
                  icon={Target}
                  label="Logic Games"
                  value="--"
                  color="text-muted-foreground"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6 mt-6">
            <div className="max-w-4xl mx-auto space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-display font-semibold">
                  Unlocked {achievements.filter((a) => a.unlocked).length} of {achievements.length}
                </h3>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {achievements.map((achievement) => (
                  <AchievementBadge
                    key={achievement.id}
                    icon={achievement.icon}
                    title={achievement.title}
                    description={achievement.description}
                    unlocked={achievement.unlocked}
                    unlockedAt={achievement.unlockedAt}
                  />
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
