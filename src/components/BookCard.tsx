import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
}

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <Card className="overflow-hidden">
      <Image
        src={book.cover || "/placeholder.svg"}
        alt={`Cover of ${book.title}`}
        width={150}
        height={200}
        className="w-full object-cover h-48"
      />
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1">{book.title}</h3>
        <p className="text-sm text-gray-600">{book.author}</p>
      </CardContent>
    </Card>
  );
}
