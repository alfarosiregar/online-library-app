import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { CircleChevronDown, Search } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";

type PropsType = {
  srcImage: string | "";
  alt: string;
  width: number;
  height: number;
};
const Hero = (props: PropsType) => {
  const { pathname } = useRouter();
  const { srcImage, alt, width, height } = props;
  const handleScroll = () => {
    document.getElementById("category")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <section className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-r from-sky-500 via-sky-400 to-sky-300">
      <div className="container px-4 md:px-6 text-center">
        <div className="flex flex-col items-center space-y-6">
          {/* Animasi Hero Text */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-2"
          >
            <motion.h1
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="text-4xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-white"
            >
              Discover Your Next Great Read
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="mx-auto max-w-[700px] text-gray-200 md:text-xl"
            >
              Explore thousands of books at your fingertips. Start your reading
              journey today.
            </motion.p>
          </motion.div>

          {/* Animasi Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="w-full max-w-lg flex items-center justify-center"
          >
            <Image src={srcImage} alt={alt} width={width} height={height} />
          </motion.div>

          {/* Animasi Hero Button */}
          {pathname === "/" && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Button
                size="lg"
                className="bg-gray-700 text-white hover:bg-gray-800 transition-all duration-300 mt-6"
                onClick={handleScroll}
              >
                <CircleChevronDown />
                Getting Started
              </Button>
            </motion.div>
          )}

          {/* Animasi Form Search */}
          {pathname === "/books" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="w-full max-w-sm space-y-2"
            >
              <motion.form
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div whileFocus={{ scale: 1.05 }} className="flex-1">
                  <Input
                    className="flex-1 bg-white text-black p-5"
                    placeholder="Search for books..."
                  />
                </motion.div>
                <motion.div whileTap={{ scale: 0.9 }}>
                  <Button type="submit" variant="secondary" className="p-5">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </motion.div>
              </motion.form>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
