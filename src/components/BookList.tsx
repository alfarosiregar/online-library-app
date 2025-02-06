"use client";

import { useState } from "react";
import BookCard from "@/components/BookCard";

// Mock data for books
const mockBooks = [
  {
    id: 1,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    cover: "/placeholder.svg?height=200&width=150",
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    cover: "/placeholder.svg?height=200&width=150",
  },
  {
    id: 3,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    cover: "/placeholder.svg?height=200&width=150",
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    cover: "/placeholder.svg?height=200&width=150",
  },
  {
    id: 5,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    cover: "/placeholder.svg?height=200&width=150",
  },
  {
    id: 6,
    title: "Moby-Dick",
    author: "Herman Melville",
    cover: "/placeholder.svg?height=200&width=150",
  },
];

export default function BookList() {
  const [books] = useState(mockBooks);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}
