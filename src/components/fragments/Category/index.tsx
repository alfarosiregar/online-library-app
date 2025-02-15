import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Category = () => {
  return (
    <section className="w-full flex justify-center py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">
          Browse Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
          {[
            "Fiction",
            "Non-Fiction",
            "Science",
            "History",
            "Biography",
            "Self-Help",
            "Mystery",
            "Romance",
          ].map((category) => (
            <motion.div key={category} whileHover={{ scale: 1.05 }}>
              <Button
                variant="outline"
                className="w-full h-20 text-lg font-semibold flex items-center justify-center"
              >
                {category}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category;
