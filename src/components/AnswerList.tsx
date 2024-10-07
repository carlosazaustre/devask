import AnswerItem from "./AnswerItem";
import { Answer } from "@/types";

const AnswerList = ({ answers }: { answers: Answer[] }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        {answers.length} respuestas
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
