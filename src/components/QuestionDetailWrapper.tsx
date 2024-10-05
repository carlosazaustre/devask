import { Suspense } from "react";
import { fetchDiscordThread } from "@/lib/discord";
import QuestionDetail from "./QuestionDetail";
import QuestionDetailSkeleton from "./QuestionDetailSkeleton";

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
      <Suspense fallback={<QuestionDetailSkeleton />}>
        <QuestionContent id={id} />
      </Suspense>
    </div>
  );
}
