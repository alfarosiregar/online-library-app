import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const SearchNavbar = () => {
  return (
    <div className="relative text-black font-bold border-gray-300 rounded-lg">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search book..."
        className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
      />
    </div>
  );
};

export default SearchNavbar;
