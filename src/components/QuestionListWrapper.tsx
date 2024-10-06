import { Suspense } from "react";
import { fetchDiscordPosts } from "@/lib/discord";
import QuestionList from "./QuestionList";
import QuestionSkeleton from "./QuestionSkeleton";

export default async function QuestionListWrapper() {
  const { activePosts, pastPosts } = await fetchDiscordPosts();

  return (
    <section className="container mx-auto px-4 py-16 max-w-4xl">
      <h3 className="text-3xl font-bold mb-8 text-gray-800 text-center">
        Preguntas recientes
      </h3>
      <Suspense fallback={<QuestionSkeleton />}>
        <QuestionList questions={activePosts} />
      </Suspense>
      <h3 className="text-3xl font-bold m-8 text-gray-800 text-center">
        Preguntas más antiguas
      </h3>
      <Suspense fallback={<QuestionSkeleton />}>
        <QuestionList questions={pastPosts} />
      </Suspense>
    </section>
  );
}
