import { Suspense } from "react";
import { fetchDiscordPosts } from "@/lib/discord";
import QuestionList from "./QuestionList";

async function QuestionsContent() {
  const questions = await fetchDiscordPosts();
  return <QuestionList questions={questions} />;
}

export default function QuestionListWrapper() {
  return (
    <section className="container mx-auto px-4 py-16 max-w-4xl">
      <h3 className="text-3xl font-bold mb-8 text-gray-800 text-center">
        Hot Questions
      </h3>
      <Suspense fallback={<div>Loading questions...</div>}>
        <QuestionsContent />
      </Suspense>
    </section>
  );
}
