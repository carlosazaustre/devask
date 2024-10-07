"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Question } from "@/types";
import { getRelativeString } from "@/lib/dateUtils";

const QuestionItem = ({ question }: { question: Question }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`bg-white rounded-lg p-6 shadow-md transition-all duration-300 ease-in-out transform ${
        isHovered ? "shadow-lg -translate-y-1" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/question/${question.id}`}>
        <h2 className="text-xl font-semibold mb-2">{question.title}</h2>
        <p className="text-gray-600 mb-4">
          {question.content
            ? question.content.substring(0, 150) + "..."
            : "No content available"}
        </p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>by {question.author}</span>
          <span>{getRelativeString(question.timeAgo)}</span>
        </div>
      </Link>
    </div>
  );
};

export default QuestionItem;
