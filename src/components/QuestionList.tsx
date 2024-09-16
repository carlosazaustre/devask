"use client";

import { useState } from "react";
import QuestionItem from "./QuestionItem";
import { Question } from "../types";

const QuestionList: React.FC = () => {
  const [hoveredQuestion, setHoveredQuestion] = useState<number | null>(null);

  const questions: Question[] = [
    {
      id: 1,
      title: "How to center a div in CSS?",
      tags: ["css", "html", "flexbox"],
      votes: 42,
      views: 1337,
      answers: 5,
      author: "CSSMaster",
      timeAgo: "2 hours ago",
    },
    {
      id: 2,
      title: "What's the difference between let and const in JavaScript?",
      tags: ["javascript", "es6"],
      votes: 31,
      views: 982,
      answers: 3,
      author: "JSNinja",
      timeAgo: "1 day ago",
    },
    {
      id: 3,
      title: "How to use useEffect hook in React?",
      tags: ["react", "hooks", "javascript"],
      votes: 56,
      views: 2104,
      answers: 7,
      author: "ReactRookie",
      timeAgo: "3 days ago",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-16 max-w-4xl">
      <h3 className="text-3xl font-bold mb-8 text-gray-800 text-center">
        Hot Questions
      </h3>
      <div className="space-y-6">
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            isHovered={hoveredQuestion === question.id}
            onHover={() => setHoveredQuestion(question.id)}
            onLeave={() => setHoveredQuestion(null)}
          />
        ))}
      </div>
    </section>
  );
};

export default QuestionList;
