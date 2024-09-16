import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  Youtube,
  LogIn,
  Search,
  Plus,
  Github,
} from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800 bg-gradient-to-r from-[#ffcc00] to-[#ff9900] bg-clip-text text-transparent">
          DevAsk
        </h1>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="hidden xl:inline-flex border-gray-300 hover:bg-gray-100 hover:text-gray-900 transition-all duration-300 ease-in-out"
          >
            <Github className="mr-2 h-4 w-4" />
            <span className="mr-1">Star</span>
            <Badge variant="secondary" className="bg-gray-200">
              1.5k
            </Badge>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="hidden lg:inline-flex border-gray-300 hover:bg-gray-100 hover:text-gray-900 transition-all duration-300 ease-in-out"
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Join Discord
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="hidden lg:inline-flex border-gray-300 hover:bg-gray-100 hover:text-gray-900 transition-all duration-300 ease-in-out"
          >
            <Youtube className="mr-2 h-4 w-4" />
            YouTube
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="hidden md:inline-flex border-gray-300 hover:bg-gray-100 hover:text-gray-900 transition-all duration-300 ease-in-out"
          >
            <LogIn className="mr-2 h-4 w-4" />
            Login with Discord
          </Button>
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
