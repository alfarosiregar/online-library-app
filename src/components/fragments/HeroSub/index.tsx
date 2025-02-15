import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const HeroSub = () => {
  const router = useRouter();

  return (
    <section className="w-full min-h-[60vh] flex items-center justify-center py-12 md:py-24 lg:py-32 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
      <div className="container px-4 md:px-6 flex flex-col items-center text-center">
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Start Your Reading Journey Today
          </h2>
          <p className="max-w-[100%] text-gray-200 md:text-lg">
            Join thousands of readers and get unlimited access to our vast
            library of books.
          </p>
          <Button
            size="lg"
            className="bg-white text-purple-600 hover:bg-gray-100 transition-all duration-300 mt-6"
            onClick={() => router.push("/auth/register")}
          >
            Sign Up Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSub;
