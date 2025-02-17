import { motion } from "framer-motion";
import { BookIcon, CloudIcon, Album } from "lucide-react";

const FeaturedFeatures = () => {
  return (
    <section className="w-full flex flex-col items-center justify-center py-24 md:py-18 lg:py-48 bg-gray-100">
      <div className="container px-4 py-10 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-10">
          Why Choose Online - Library?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center space-y-2 p-6 bg-white rounded-lg shadow-md"
          >
            <BookIcon className="h-12 w-12 text-purple-500" />
            <h3 className="text-xl font-semibold">
              Extensive Academic Resources
            </h3>
            <p className="text-center text-gray-600">
              Akses koleksi makalah penelitian, jurnal, dan e-book di berbagai
              disiplin ilmu.
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center space-y-2 p-6 bg-white rounded-lg shadow-md"
          >
            <Album className="h-12 w-12 text-pink-500" />
            <h3 className="text-xl font-semibold">
              Search Anytime and Anywhere
            </h3>
            <p className="text-center text-gray-600">
              Cari buku akademis di perangkat apa saja, kapan saja, dari mana
              saja.
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center space-y-2 p-6 bg-white rounded-lg shadow-md"
          >
            <CloudIcon className="h-12 w-12 text-red-500" />
            <h3 className="text-xl font-semibold">Library Sync</h3>
            <p className="text-center text-gray-600">
              Semua koleksi buku di perpustakaan disinkronisasikan dengan web.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedFeatures;
