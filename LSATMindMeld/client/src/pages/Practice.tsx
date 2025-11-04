import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { QuestionCard } from "@/components/QuestionCard";
import { TimerDisplay } from "@/components/TimerDisplay";
import { XPProgressBar } from "@/components/XPProgressBar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ArrowLeft, SkipForward } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const mockQuestions = [
  {
    id: "1",
    question: "Which one of the following, if true, most strengthens the argument that regular exercise improves cognitive function?",
    options: [
      "Many people who exercise regularly report feeling more mentally alert",
      "Studies show that sedentary individuals have higher rates of cognitive decline",
      "Exercise increases blood flow to the brain, delivering more oxygen and nutrients",
      "Athletes tend to perform better on certain cognitive tests than non-athletes",
    ],
    correctAnswer: 2,
    explanation: "Option C provides the most direct causal mechanism linking exercise to cognitive improvement. It explains HOW exercise affects the brain (increased blood flow, oxygen, and nutrients), which directly supports cognitive function.",
    xpReward: 25,
  },
  {
    id: "2",
    question: "The city council's decision to reduce public transportation funding will likely result in increased traffic congestion. This is because fewer buses will run, forcing more people to drive. Which assumption underlies this argument?",
    options: [
      "People prefer driving to taking public transportation",
      "Current bus riders will switch to driving if bus service is reduced",
      "Traffic congestion is currently at acceptable levels",
      "The city council has adequate funding for road maintenance",
    ],
    correctAnswer: 1,
    explanation: "The argument assumes that if bus service is reduced, those who currently use buses will switch to driving. Without this assumption, the conclusion about increased traffic doesn't follow.",
    xpReward: 30,
  },
];

export default function Practice() {
  const [, setLocation] = useLocation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userXP, setUserXP] = useState(350);
  const [timedMode] = useState(true);

  const handleAnswer = (correct: boolean) => {
    if (correct) {
      setUserXP((prev) => prev + mockQuestions[currentQuestion].xpReward);
      console.log("Correct answer! +XP");
    }
  };

  const handleNext = () => {
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      console.log("Practice session complete!");
    }
  };

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container flex items-center justify-between h-16 px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLocation("/")}
            data-testid="button-back"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <Badge variant="secondary">
              Question {currentQuestion + 1} / {mockQuestions.length}
            </Badge>
            {timedMode && <TimerDisplay initialSeconds={180} />}
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="container px-4 py-8 space-y-6 max-w-4xl mx-auto">
        <XPProgressBar currentXP={userXP} targetXP={500} level={5} />

        <QuestionCard
          question={mockQuestions[currentQuestion].question}
          options={mockQuestions[currentQuestion].options}
          correctAnswer={mockQuestions[currentQuestion].correctAnswer}
          explanation={mockQuestions[currentQuestion].explanation}
          xpReward={mockQuestions[currentQuestion].xpReward}
          onAnswer={handleAnswer}
        />

        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={handleNext}
            data-testid="button-skip"
          >
            <SkipForward className="mr-2 h-4 w-4" />
            Skip
          </Button>
          <Button onClick={handleNext} data-testid="button-next">
            Next Question
          </Button>
        </div>
      </div>
    </div>
  );
}
