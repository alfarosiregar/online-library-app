import { Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function NotFound404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Image src="/404.png" alt="404" width={500} height={500} />
      <p className="text-gray-500 mb-5 text-center max-w-md px-8">
        Oops! The page you're looking for doesn't exist. It might have been
        moved or deleted.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex gap-2 items-center text-lg"
      >
        <Home />
        Homepage
      </Link>
    </div>
  );
}
