"use client";

import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, User, Clock } from "lucide-react";
import { Answer } from "@/types";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { getRelativeString } from "@/lib/dateUtils";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

const AnswerItem = ({ answer }: { answer: Answer }) => {
  const renderContent = (content: string) => {
    const codeRegex = /```(\w+)?\s*([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeRegex.exec(content)) !== null) {
      if (lastIndex < match.index) {
        parts.push(content.slice(lastIndex, match.index));
      }
      const language = match[1] || "text";
      const code = match[2].trim();
      parts.push(
        <SyntaxHighlighter
          key={parts.length}
          language={language}
          style={tomorrow}
        >
          {code}
        </SyntaxHighlighter>
      );
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < content.length) {
      parts.push(content.slice(lastIndex));
    }

    return parts;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-start">
        <div className="flex flex-col items-center mr-4">
          <Button variant="ghost" size="sm" onClick={() => {}}>
            <ArrowUp className="h-5 w-5" />
          </Button>
          <span className="font-medium text-gray-700">{answer.votes}</span>
          <Button variant="ghost" size="sm" onClick={() => {}}>
            <ArrowDown className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex-1">
          <p className="text-gray-700 mb-4">{renderContent(answer.content)}</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              {answer.author}
            </span>
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {getRelativeString(answer.timeAgo)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnswerItem;
