"use client";

import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, User, Clock } from "lucide-react";
import { Answer } from "@/types";

interface AnswerItemProps {
  answer: Answer;
}

const AnswerItem: React.FC<AnswerItemProps> = ({ answer }) => {
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
          <p className="text-gray-700 mb-4 whitespace-pre-wrap">
            {answer.content}
          </p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              {answer.author}
            </span>
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {answer.timeAgo}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnswerItem;
