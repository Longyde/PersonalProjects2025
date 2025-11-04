import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Lightbulb } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type QuestionCardProps = {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  xpReward: number;
  onAnswer?: (correct: boolean) => void;
};

export function QuestionCard({
  question,
  options,
  correctAnswer,
  explanation,
  xpReward,
  onAnswer,
}: QuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswerSelect = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
    const isCorrect = index === correctAnswer;
    onAnswer?.(isCorrect);
  };

  const isCorrect = selectedAnswer === correctAnswer;

  return (
    <Card className="p-6 md:p-8 space-y-6">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <p className="text-lg leading-relaxed">{question}</p>
          <Badge variant="secondary" className="shrink-0">
            +{xpReward} XP
          </Badge>
        </div>

        <div className="space-y-3">
          {options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectOption = index === correctAnswer;
            const showCorrect = showExplanation && isCorrectOption;
            const showIncorrect = showExplanation && isSelected && !isCorrectOption;

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={selectedAnswer !== null}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all hover-elevate active-elevate-2 ${
                  showCorrect
                    ? "border-success bg-success/10"
                    : showIncorrect
                    ? "border-destructive bg-destructive/10"
                    : isSelected
                    ? "border-primary bg-primary/5"
                    : "border-border"
                }`}
                data-testid={`button-option-${index}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span>{option}</span>
                  {showCorrect && <CheckCircle className="h-5 w-5 text-success shrink-0" />}
                  {showIncorrect && <XCircle className="h-5 w-5 text-destructive shrink-0" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-2 text-sm font-medium">
              <Lightbulb className="h-4 w-4 text-warning" />
              <span>Explanation</span>
            </div>
            <div
              className={`p-4 rounded-lg ${
                isCorrect ? "bg-success/10 text-success-foreground" : "bg-muted"
              }`}
            >
              <p className="text-sm leading-relaxed">{explanation}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
