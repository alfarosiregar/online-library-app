import { motion } from "framer-motion";
import { BookIcon, CloudIcon, Album } from "lucide-react";

const FeaturedFeatures = () => {
  return (
    <section className="w-full flex flex-col items-center justify-center py-24 md:py-18 lg:py-48 bg-gray-100">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-10">
          Why Choose OnlineLib?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center space-y-2 p-6 bg-white rounded-lg shadow-md"
          >
            <BookIcon className="h-12 w-12 text-purple-500" />
            <h3 className="text-xl font-semibold">Vast Collection</h3>
            <p className="text-center text-gray-600">
              Access to over 100,000 titles across various genres.
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center space-y-2 p-6 bg-white rounded-lg shadow-md"
          >
            <Album className="h-12 w-12 text-pink-500" />
            <h3 className="text-xl font-semibold">Read Anywhere</h3>
            <p className="text-center text-gray-600">
              Enjoy your books on any device, anytime, anywhere.
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center space-y-2 p-6 bg-white rounded-lg shadow-md"
          >
            <CloudIcon className="h-12 w-12 text-red-500" />
            <h3 className="text-xl font-semibold">Cloud Sync</h3>
            <p className="text-center text-gray-600">
              Your library and progress sync across all your devices.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedFeatures;
