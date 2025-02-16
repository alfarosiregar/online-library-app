import Image from "next/image";
import Link from "next/link";

export default function NotFound404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Image src="/404.png" alt="404" width={500} height={500} />
      <h2 className="text-2xl font-semibold text-gray-600 mb-6">
        Page Not Found
      </h2>
      <p className="text-gray-500 mb-8 text-center max-w-md">
        Oops! The page you're looking for doesn't exist. It might have been
        moved or deleted.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
      >
        Go Back Home
      </Link>
    </div>
  );
}
