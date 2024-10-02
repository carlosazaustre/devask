import QuestionDetail from "@/components/QuestionDetail";
import AnswerList from "@/components/AnswerList";
import AnswerForm from "@/components/AnswerForm";
import { Question, Answer } from "@/types";

// This would typically come from an API or database
const question: Question = {
  id: "1",
  title: "How to center a div in CSS?",
  content:
    "I'm trying to center a div both horizontally and vertically within its parent container. I've tried using margin: auto but it only centers horizontally. What's the best way to achieve this?",
  tags: ["css", "html", "flexbox"],
  votes: 42,
  views: 1337,
  answers: 5,
  author: "CSSMaster",
  timeAgo: "2 hours ago",
};

const answers: Answer[] = [
  {
    id: 1,
    content:
      "You can use Flexbox to center a div both horizontally and vertically. Here's how:\n\n```css\n.parent {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh; /* Adjust as needed */\n}\n```\n\nThis will make the parent a flex container and center its children both horizontally and vertically.",
    author: "FlexboxPro",
    votes: 15,
    timeAgo: "1 hour ago",
  },
  {
    id: 2,
    content:
      "Another approach is to use CSS Grid:\n\n```css\n.parent {\n  display: grid;\n  place-items: center;\n  height: 100vh; /* Adjust as needed */\n}\n```\n\nThis is a more modern approach and works great for centering items.",
    author: "GridMaster",
    votes: 8,
    timeAgo: "45 minutes ago",
  },
];

export default function QuestionPage() {
  return (
    <section className="container mx-auto px-4 py-16 max-w-4xl">
      <QuestionDetail question={question} />
      <AnswerList answers={answers} />
      <AnswerForm />
    </section>
  );
}
