import { Suspense } from "react";
import { fetchDiscordThread } from "@/lib/discord";
import QuestionDetail from "./QuestionDetail";
import QuestionSkeleton from "./QuestionSkeleton";

async function QuestionContent({ id }: { id: string }) {
  const question = await fetchDiscordThread(id);

  if (!question) {
    return <div>Question not found</div>;
  }

  return <QuestionDetail question={question} />;
}

export default function QuestionDetailWrapper({ id }: { id: string }) {
  return (
    <div className="flex-1">
      <Suspense fallback={<QuestionSkeleton />}>
        <QuestionContent id={id} />
      </Suspense>
    </div>
  );
}
