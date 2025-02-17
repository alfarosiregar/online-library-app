import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Category = () => {
  return (
    <section
      id="category"
      className="w-full flex justify-center py-24 md:py-18 lg:py-48"
    >
      <div className="container px-4 py-10 md:px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-10">
          Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
          {[
            "Religion",
            "Social",
            "Science",
            "History",
            "Biography",
            "Arts",
            "Geography",
            "Technology ",
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
