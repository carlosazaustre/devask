import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { MessageCircleCode, Youtube, Search, Plus, Github } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-3xl font-bold text-gray-800 bg-gradient-to-r from-[#ffcc00] to-[#ff9900] bg-clip-text text-transparent"
        >
          DevAsk
        </Link>
        <div className="flex items-center space-x-2">
          <Link href="https://github.com/carlosazaustre/devask" target="_blank">
            <Button
              variant="outline"
              size="sm"
              className="hidden xl:inline-flex border-gray-300 hover:bg-gray-100 hover:text-gray-900 transition-all duration-300 ease-in-out"
            >
              <Github className="mr-2 h-4 w-4" />
              <Badge variant="secondary" className="bg-gray-200">
                1.5k
              </Badge>
            </Button>
          </Link>
          <Link href="https://discord.gg/carlosazaustre" target="_blank">
            <Button
              variant="outline"
              size="sm"
              className="hidden lg:inline-flex border-[#5865F2] hover:bg-[#5865F233] hover:text-gray-900 transition-all duration-300 ease-in-out"
            >
              <MessageCircleCode className="mr-2 h-4 w-4" color="#5865f2" />
              Únete a la comunidad en Discord
            </Button>
          </Link>
          <Link
            href="https://youtube.com/carlosazaustre?sub_confirmation=1"
            target="_blank"
          >
            <Button
              variant="outline"
              size="sm"
              className="hidden lg:inline-flex border-[#c4302b] hover:bg-[#ffc8c6] hover:text-gray-900 transition-all duration-300 ease-in-out"
            >
              <Youtube className="mr-2 h-4 w-4" color="#c4302b" />
              Sígueme en YouTube
            </Button>
          </Link>
          <Button
            variant="outline"
            size="icon"
            className="hidden sm:inline-flex border-gray-300 hover:bg-gray-100 hover:text-gray-900 transition-all duration-300 ease-in-out"
          >
            <Search className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="hidden sm:inline-flex border-gray-300 hover:bg-gray-100 hover:text-gray-900 transition-all duration-300 ease-in-out"
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
