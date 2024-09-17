import AnswerItem from "./AnswerItem";
import { Answer } from "@/types";

interface AnswerListProps {
  answers: Answer[];
}

const AnswerList: React.FC<AnswerListProps> = ({ answers }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        {answers.length} Answers
      </h2>
      <div className="space-y-6">
        {answers.map((answer) => (
          <AnswerItem key={answer.id} answer={answer} />
        ))}
      </div>
    </div>
  );
};

export default AnswerList;
