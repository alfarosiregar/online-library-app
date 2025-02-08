import BookCard from "@/components/fragments/BookCard";
import SkeletonFragment from "@/components/fragments/skeleton";
import { BookType } from "@/types/book.type";

const BookView = ({ products }: { products: BookType[] }) => {
  return (
    <main>
      <div className="flex flex-wrap justify-center gap-8 w-full">
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
            <SkeletonFragment />
            <SkeletonFragment />
            <SkeletonFragment />
            <SkeletonFragment />
          </>
        )}
      </div>
    </main>
  );
};

export default BookView;
