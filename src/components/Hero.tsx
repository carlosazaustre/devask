import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-[#ffcc00] to-[#ff9900] py-20 px-4">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight drop-shadow-md">
          Desbloquea tu Potencial como Desarrollador
        </h2>
        <p className="text-xl md:text-2xl text-gray-100 mb-8 drop-shadow">
          Obtén respuestas. Comparte conocimiento. Crece en comunidad.
        </p>
        <Button
          size="lg"
          className="bg-white text-[#ff9900] hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg"
        >
          Start Asking
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </section>
  );
};

export default Hero;
