import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const AnswerForm: React.FC = () => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Answer</h2>
      <Textarea
        className="w-full mb-4"
        rows={6}
        placeholder="Write your answer here..."
      />
      <Button className="bg-[#ffcc00] text-gray-900 hover:bg-[#ff9900] transition-colors duration-300">
        Post Your Answer
      </Button>
    </div>
  );
};

export default AnswerForm;
