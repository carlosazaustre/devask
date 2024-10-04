import { Suspense } from "react";
import { fetchDiscordThread } from "@/lib/discord";
import QuestionDetail from "./QuestionDetail";

async function QuestionContent({ id }: { id: string }) {
  const question = await fetchDiscordThread(id);

  if (!question) {
    return <div>Question not found</div>;
  }

  return <QuestionDetail question={question} />;
}

export default function QuestionDetailWrapper({ id }: { id: string }) {
  return (
    <Suspense fallback={<div>Loading question...</div>}>
      <QuestionContent id={id} />
    </Suspense>
  );
}
