import Image from "next/image";
import Link from "next/link";

import { Clock, Users } from "lucide-react";

import { Badge, Card, CardContent, CardHeader } from "@/components/ui";
import { Quiz } from "@/types/quiz";

interface QuizCardProps {
  quiz: Quiz;
}

export const QuizCard = ({ quiz }: QuizCardProps) => {
  return (
    <Link href={`/quizzes/${quiz.id}`}>
      <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800/50 hover:dark:border-slate-600">
        {quiz.image && (
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={quiz.image}
              alt={quiz.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-semibold transition-colors group-hover:text-primary">{quiz.title}</h3>
              <p className="text-sm text-muted-foreground">{quiz.category}</p>
            </div>
            <Badge variant="secondary">{quiz.difficulty}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-muted-foreground">{quiz.description}</p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{quiz.duration} mins</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{quiz.totalAttempts?.toLocaleString() ?? 0} attempts</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
