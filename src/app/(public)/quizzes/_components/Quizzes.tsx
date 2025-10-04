"use client";

import { useState } from "react";

import { Search } from "lucide-react";

import { Input, Typography } from "@/components/ui";
import { Quiz } from "@/types/quiz";

import { QuizCard } from "./QuizCard";

// Dummy quiz data
const quizzes: Quiz[] = [
  {
    id: "1",
    title: "Web Development Fundamentals",
    description: "Test your knowledge of HTML, CSS, and JavaScript basics",
    duration: 30,
    category: "Web Development",
    difficulty: "Beginner",
    totalAttempts: 1234,
    averageScore: 75,
    image: "/images/html.svg",
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
      // Add more questions...
    ],
  },
  {
    id: "2",
    title: "Python Programming Challenge",
    description: "Challenge yourself with Python programming concepts",
    duration: 45,
    category: "Programming",
    difficulty: "Intermediate",
    totalAttempts: 856,
    averageScore: 68,
    image: "/images/python.svg",
    questions: [
      {
        id: "q1",
        question: "What is the output of: print(type([]))?",
        options: ["<class 'list'>", "<class 'array'>", "<class 'tuple'>", "<class 'set'>"],
        correctAnswer: 0,
        explanation: "In Python, [] creates an empty list, and type([]) returns <class 'list'>.",
      },
      // Add more questions...
    ],
  },
  // Add more quizzes...
];

export const Quizzes = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredQuizzes = quizzes.filter(
    (quiz) =>
      quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quiz.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto max-w-7xl px-4 py-10">
      {/* Header */}
      <div className="mb-10 text-center">
        <Typography variant="h1" className="mb-4">
          Challenge Yourself with Our <span className="text-primary">Quizzes</span>
        </Typography>
        <Typography className="text-muted-foreground">
          Test your knowledge and improve your skills with our interactive quizzes
        </Typography>
      </div>

      {/* Search */}
      <div className="mb-8">
        <div className="mx-auto max-w-md">
          <div className="relative">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="Search quizzes..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Quiz Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredQuizzes.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}
      </div>
    </div>
  );
};
