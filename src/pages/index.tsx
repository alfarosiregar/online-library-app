import BookList from "@/components/BookList";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import Navbar from "@/components/layouts/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:space-x-4">
          {/* <aside className="w-full md:w-1/4 mb-4 md:mb-0">
            <CategoryFilter />
          </aside>
          <div className="w-full md:w-3/4">
            <SearchBar />
            <BookList />
          </div> */}
        </div>
      </main>
    </div>
  );
}
