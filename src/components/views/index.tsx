import Category from "../fragments/Category";
import FeaturedBook from "../fragments/FeaturedBook";
import FeaturedFeatures from "../fragments/FeaturedFeatures";
import Hero from "../fragments/Hero";
import HeroSub from "../fragments/HeroSub";
import { useSession } from "next-auth/react";
const MainView = () => {
  const { data } = useSession();
  return (
    <div className="flex flex-col min-h-screen">
      <main>
        <Hero />
        <Category />
        <FeaturedFeatures />
        <FeaturedBook />
        {!data?.user && <HeroSub />}{" "}
      </main>
    </div>
  );
};

export default MainView;
