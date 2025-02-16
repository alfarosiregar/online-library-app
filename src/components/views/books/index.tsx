import BookCard from "@/components/fragments/Card";
import Hero from "@/components/fragments/Hero";
import SkeletonCard from "@/components/fragments/Skeleton";
import { BookType } from "@/types/book.type";

const BookView = ({ products }: { products: BookType[] }) => {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Tambahkan padding-top agar tidak tertutup Navbar */}
      <div className="flex flex-wrap justify-center gap-8 w-full">
        <Hero
          srcImage="/book-lover-without-bg.png"
          alt="Image in Hero"
          width={300}
          height={300}
        />
        {products.length > 0 ? (
          products.map((product) => (
            <BookCard
              key={product.id}
              id={product.id}
              name={product.name}
              image={product.image}
              category={product.category}
              rating={0}
            />
          ))
        ) : (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        )}
      </div>
    </main>
  );
};

export default BookView;
