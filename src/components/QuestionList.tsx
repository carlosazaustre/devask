import { Suspense } from "react";
import QuestionItem from "./QuestionItem";
import { fetchDiscordPosts } from "@/lib/discord";

async function Questions() {
  const questions = await fetchDiscordPosts();

  return (
    <div className="space-y-6">
      {questions.map((question) => (
        <QuestionItem key={question.id} question={question} />
      ))}
    </div>
  );
}

export default function QuestionList() {
  return (
    <section className="container mx-auto px-4 py-16 max-w-4xl">
      <h3 className="text-3xl font-bold mb-8 text-gray-800 text-center">
        Hot Questions
      </h3>
      <Suspense fallback={<div>Loading questions...</div>}>
        <Questions />
      </Suspense>
    </section>
  );
}
