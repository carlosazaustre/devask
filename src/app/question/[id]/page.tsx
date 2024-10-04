import QuestionDetailWrapper from "@/components/QuestionDetailWrapper";

export default function QuestionPage({ params }: { params: { id: string } }) {
  return <QuestionDetailWrapper id={params.id} />;
}
