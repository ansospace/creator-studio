"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { ArrowLeft, CheckCircle2, Clock, XCircle } from "lucide-react";

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Progress,
  Typography,
} from "@/components/ui";
import { Quiz } from "@/types/quiz";

interface QuizDetailsProps {
  quiz: Quiz;
}

export const QuizDetails = ({ quiz }: QuizDetailsProps) => {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState<{ questionId: string; isCorrect: boolean }[]>([]);

  const question = quiz.questions[currentQuestion];
  const isLastQuestion = currentQuestion === quiz.questions.length - 1;
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  const handleAnswerSelect = (optionIndex: number) => {
    if (selectedAnswer !== null) return; // Prevent changing answer after selection
    setSelectedAnswer(optionIndex);
    setShowExplanation(true);

    // Record the answer
    setAnswers([
      ...answers,
      {
        questionId: question.id,
        isCorrect: optionIndex === question.correctAnswer,
      },
    ]);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      // Calculate and show results
      const correctAnswers = answers.filter((a) => a.isCorrect).length;
      const score = Math.round((correctAnswers / quiz.questions.length) * 100);
      alert(`Quiz completed! Your score: ${score}%`); // Replace with proper results UI
      router.push("/quizzes");
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Button variant="ghost" onClick={() => router.push("/quizzes")} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Quizzes
        </Button>
        <div className="flex items-center justify-between">
          <div>
            <Typography variant="h1" className="mb-2">
              {quiz.title}
            </Typography>
            <div className="flex items-center gap-4">
              <Badge variant="secondary">{quiz.difficulty}</Badge>
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {quiz.duration} mins
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="mb-2 flex justify-between text-sm">
          <span>
            Question {currentQuestion + 1} of {quiz.questions.length}
          </span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl">{question.question}</CardTitle>
          <CardDescription>Select the best answer</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {question.options.map((option, index) => {
            const isCorrect = index === question.correctAnswer;
            const isSelected = selectedAnswer === index;
            let buttonVariant: "outline" | "default" | "success" | "destructive" = "outline";

            if (selectedAnswer !== null) {
              if (isSelected) {
                buttonVariant = isCorrect ? "success" : "destructive";
              } else if (isCorrect) {
                buttonVariant = "success";
              }
            }

            return (
              <Button
                key={index}
                variant={buttonVariant}
                className="w-full justify-start gap-2 px-4 py-6"
                onClick={() => handleAnswerSelect(index)}
                disabled={selectedAnswer !== null}
              >
                {selectedAnswer !== null && isCorrect && <CheckCircle2 className="h-4 w-4" />}
                {selectedAnswer !== null && isSelected && !isCorrect && <XCircle className="h-4 w-4" />}
                {option}
              </Button>
            );
          })}
        </CardContent>
        {showExplanation && (
          <CardFooter className="border-t bg-muted/50 p-4">
            <div>
              <Typography variant="h4" className="mb-2 text-sm font-semibold">
                Explanation
              </Typography>
              <Typography className="text-sm text-muted-foreground">{question.explanation}</Typography>
            </div>
          </CardFooter>
        )}
      </Card>

      {/* Navigation */}
      <div className="flex justify-end">
        <Button onClick={handleNext} disabled={selectedAnswer === null}>
          {isLastQuestion ? "Finish Quiz" : "Next Question"}
        </Button>
      </div>
    </div>
  );
};
