export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  questions: QuizQuestion[];
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  totalAttempts?: number;
  averageScore?: number;
  image?: string;
}
