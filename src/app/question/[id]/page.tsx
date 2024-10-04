import { Suspense } from "react";
import { fetchDiscordThread } from "@/lib/discord";
import QuestionDetail from "@/components/QuestionDetail";

export default async function QuestionPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <Suspense fallback={<div>Loading question...</div>}>
      <QuestionContent id={params.id} />
    </Suspense>
  );
}

async function QuestionContent({ id }: { id: string }) {
  const question = await fetchDiscordThread(id);

  if (!question) {
    return <div>Question not found</div>;
  }

  return <QuestionDetail question={question} />;
}
