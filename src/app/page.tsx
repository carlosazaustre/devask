import Hero from "@/components/Hero";
import QuestionList from "@/components/QuestionList";

export default function Home() {
  return (
    <>
      <main className="flex-1">
        <Hero />
        <QuestionList />
      </main>
    </>
  );
}
