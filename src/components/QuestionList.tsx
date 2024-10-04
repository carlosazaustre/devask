import QuestionItem from "./QuestionItem";
import { Question } from "@/types";

export default function QuestionList({ questions }: { questions: Question[] }) {
  return (
    <div className="space-y-6">
      {questions.map((question) => (
        <QuestionItem key={question.id} question={question} />
      ))}
    </div>
  );
}
