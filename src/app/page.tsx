// Page Route: /

import Hero from "@/components/Hero";
import QuestionListWrapper from "@/components/QuestionListWrapper";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <QuestionListWrapper />
    </main>
  );
}
