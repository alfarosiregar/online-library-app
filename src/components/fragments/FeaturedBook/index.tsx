import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ListTodo, Logs, Router } from "lucide-react";
import { useRouter } from "next/router";

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.2, duration: 0.6, ease: "easeOut" },
  },
};

const bookVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

const FeaturedBook = () => {
  const { push } = useRouter();
  return (
    <section className="flex items-center justify-center w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8"
        >
          Featured Books
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {[1, 2, 3, 4].map((book) => (
            <motion.div
              key={book}
              variants={bookVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.75 }}
              className="flex flex-col items-center space-y-3 p-4 bg-white rounded-lg shadow-md cursor-pointer transition-all duration-300 hover:shadow-xl"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="w-full h-48 bg-gray-200 rounded-md mb-2"
              ></motion.div>

              <h3 className="text-lg font-semibold">Book Title {book}</h3>
              <p className="text-sm text-gray-500">Author Name</p>

              <motion.div whileTap={{ scale: 0.9 }}>
                <Button variant="outline" size="sm">
                  Read Now
                </Button>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
        <div className="flex justify-center mt-8">
          <Button
            className="hover:bg-gray-700 transition-all duration-300"
            onClick={() => {
              push("/books");
            }}
          >
            See All Books
            <Logs />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBook;
