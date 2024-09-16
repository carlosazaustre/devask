import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, Eye, MessageSquare, User } from "lucide-react";
import { Question } from "../types";

interface QuestionItemProps {
  question: Question;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

const QuestionItem: React.FC<QuestionItemProps> = ({
  question,
  onHover,
  onLeave,
}) => {
  return (
    <div
      className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="flex items-start">
        <div className="flex flex-col items-center mr-4 text-gray-500">
          <ArrowUp className="h-6 w-6" />
          <span className="font-medium">{question.votes}</span>
        </div>
        <div className="flex-1">
          <Link
            href={`/question/${question.id}`}
            className="text-xl font-medium text-gray-900 hover:text-[#ff9900] transition-colors duration-300"
          >
            {question.title}
          </Link>
          <div className="mt-2 flex flex-wrap items-center text-sm text-gray-500 gap-4">
            <span className="flex items-center">
              <Eye className="h-4 w-4 mr-1" />
              {question.views} views
            </span>
            <span className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-1" />
              {question.answers} answers
            </span>
            <span className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              {question.author}
            </span>
            <span>{question.timeAgo}</span>
          </div>
          <div className="mt-3 space-x-2">
            {question.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors duration-300"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionItem;
