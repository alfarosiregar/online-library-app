import BookCard from "@/components/fragments/Card";
import Hero from "@/components/fragments/Hero";
import SkeletonCard from "@/components/fragments/Skeleton";
import { BookType } from "@/types/book.type";
import Head from "next/head";

const BookView = ({ products }: { products: BookType[] }) => {
  return (
    <div>
      <Head>
        <title>Buku</title>
        <meta name="description" content="Buku" />
      </Head>
      <main className="flex flex-col min-h-screen">
        {/* Tambahkan padding-top agar tidak tertutup Navbar */}
        <div className="flex flex-wrap justify-center gap-8 w-full mb-10">
          <Hero
            srcImage="/book-lover.png"
            alt="Image in Hero"
            width={300}
            height={300}
          />
          {products && products.length > 0 ? (
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
    </div>
  );
};

export default BookView;
