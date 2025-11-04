import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { StudyModeCard } from "@/components/StudyModeCard";
import { XPProgressBar } from "@/components/XPProgressBar";
import { StreakDisplay } from "@/components/StreakDisplay";
import { Lightbulb, BookOpen, PuzzleIcon, Zap, Menu } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import heroImage from "@assets/stock_images/brain_thinking_puzzl_81a0c328.jpg";

export default function Home() {
  const [userLevel] = useState(5);
  const [userXP] = useState(350);
  const [streak] = useState(7);

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="md:hidden" data-testid="button-menu">
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-display font-bold">LSAT Mastery</h1>
          </div>
          <div className="flex items-center gap-2">
            <StreakDisplay streak={streak} compact />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-10" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative z-20 container px-4 py-12 md:py-20">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-display font-bold">
              Master the LSAT with Gamified Learning
            </h2>
            <p className="text-lg text-muted-foreground">
              Improve your critical thinking and analytical reasoning through interactive lessons,
              practice questions, and fun challenges
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/practice">
                <Button size="lg" className="w-full sm:w-auto" data-testid="button-start-practicing">
                  <Zap className="mr-2 h-5 w-5" />
                  Start Practicing
                </Button>
              </Link>
              <Link href="/progress">
                <Button size="lg" variant="outline" className="w-full sm:w-auto" data-testid="button-view-progress">
                  View Progress
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="container px-4 py-8 md:py-12 space-y-8">
        <div className="max-w-2xl mx-auto">
          <XPProgressBar currentXP={userXP} targetXP={500} level={userLevel} />
        </div>

        <section className="space-y-6">
          <div>
            <h3 className="text-2xl font-display font-bold mb-2">Study Modes</h3>
            <p className="text-muted-foreground">Choose your learning path</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            <Link href="/practice?mode=logical-reasoning">
              <StudyModeCard
                icon={Lightbulb}
                title="Logical Reasoning"
                description="Master arguments, assumptions, and logical fallacies"
                progress={65}
                color="bg-primary/10 text-primary"
              />
            </Link>
            <Link href="/practice?mode=reading-comprehension">
              <StudyModeCard
                icon={BookOpen}
                title="Reading Comprehension"
                description="Analyze complex passages and extract key information"
                progress={42}
                color="bg-success/10 text-success"
              />
            </Link>
            <StudyModeCard
              icon={PuzzleIcon}
              title="Logic Games"
              description="Solve analytical reasoning puzzles"
              progress={0}
              locked={true}
              color="bg-warning/10 text-warning"
            />
          </div>
        </section>

        <section className="max-w-2xl mx-auto bg-gradient-to-br from-primary/5 to-transparent rounded-2xl p-6 md:p-8 border">
          <StreakDisplay streak={streak} />
        </section>
      </div>
    </div>
  );
}
