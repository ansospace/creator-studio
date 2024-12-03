import { notFound } from "next/navigation";

import { QuizDetails } from "./_components/QuizDetails";

// Mock function to fetch quiz - replace with actual API call
const getQuiz = async (id: string) => {
  // Simulating API call with dummy data
  return {
    status: "success",
    data: {
      quiz: {
        id,
        title: "Web Development Fundamentals",
        description: "Test your knowledge of HTML, CSS, and JavaScript basics",
        duration: 30,
        category: "Web Development",
        difficulty: "Beginner",
        totalAttempts: 1234,
        averageScore: 75,
        image: "/images/quizzes/web-dev.jpg",
        questions: [
          {
            id: "q1",
            question: "What does HTML stand for?",
            options: [
              "Hyper Text Markup Language",
              "High Tech Modern Language",
              "Hyper Transfer Markup Language",
              "Home Tool Markup Language",
            ],
            correctAnswer: 0,
            explanation: "HTML stands for HyperText Markup Language, the standard markup language for web pages.",
          },
          {
            id: "q2",
            question: "Which CSS property is used to change the text color?",
            options: ["text-color", "color", "font-color", "text-style"],
            correctAnswer: 1,
            explanation: "The 'color' property is used to specify the color of text in CSS.",
          },
          {
            id: "q3",
            question: "What is the correct way to declare a JavaScript variable?",
            options: ["variable name = value;", "v name;", "let name;", "var = name;"],
            correctAnswer: 2,
            explanation: "'let' is the modern way to declare variables in JavaScript.",
          },
        ],
      },
    },
  };
};

interface QuizPageProps {
  params: {
    quizId: string;
  };
}

const QuizPage = async ({ params }: QuizPageProps) => {
  if (!params.quizId) {
    notFound();
  }

  const response = await getQuiz(params.quizId);
  if (!response.data?.quiz) {
    notFound();
  }

  return <QuizDetails quiz={response.data.quiz} />;
};

export default QuizPage;
