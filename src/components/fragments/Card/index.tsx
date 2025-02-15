import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";

type CardProps = {
  id: string;
  image: string;
  name: string;
  category: string;
  rating: number;
};

const BookCard = ({ id, image, name, category, rating = 4.5 }: CardProps) => {
  return (
    <Card className="w-full max-w-sm overflow-hidden mx-3 my-10">
      <Link href={`/product/${id}`}>
        <CardHeader className="p-0">
          <div className="aspect-square overflow-hidden">
            <Image
              src={image}
              alt={name}
              width={300}
              height={300}
              className="h-full w-full object-cover transition-transform hover:scale-105"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <Badge variant="outline" className="mb-2">
            {category}
          </Badge>
          <CardTitle className="line-clamp-2 text-lg font-semibold">
            {name}
          </CardTitle>
          <div className="mt-2 flex items-center justify-between">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-current" />
              <span>{rating.toFixed(1)}</span>
            </Badge>
          </div>
        </CardContent>
        <CardFooter className="gap-5">
          <Button className="w-full">Add to Cart</Button>
          <Button className="w-full bg-neutral-500 hover:bg-neutral-400	">
            Buy Now
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default BookCard;
