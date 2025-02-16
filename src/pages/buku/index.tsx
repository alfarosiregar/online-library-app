import React, { useEffect } from "react";
import BookView from "@/components/views/user/buku";
import { useRouter } from "next/router";
import useSWR from "swr";
import { fetcher } from "@/lib/swr/fetcher";

const ProductsPage = () => {
  const { push } = useRouter();

  const { data, error, isLoading } = useSWR("/api/books", fetcher);

  useEffect(() => {
    if (error) {
      push("/404");
    }
  }, []);

  return (
    <main>
      <BookView products={isLoading ? {} : data.data} />
    </main>
  );
};

export default ProductsPage;
