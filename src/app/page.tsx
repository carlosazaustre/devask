import Header from "../components/Header";
import Hero from "../components/Hero";
import QuestionList from "../components/QuestionList";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <QuestionList />
      </main>
      <Footer />
    </>
  );
}
