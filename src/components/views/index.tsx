import { useSession } from "next-auth/react";
import Category from "../fragments/Category";
import FeaturedBook from "../fragments/FeaturedBook";
import FeaturedFeatures from "../fragments/FeaturedFeatures";
import Hero from "../fragments/Hero";
import HeroSub from "../fragments/HeroSub";

const MainView = () => {
  const { data } = useSession();
  console.log(data);

  return (
    <div className="flex flex-col min-h-screen">
      <main>
        <Hero />
        <FeaturedBook />
        <FeaturedFeatures />
        <Category />
        {!data?.user && <HeroSub />}{" "}
      </main>
    </div>
  );
};

export default MainView;
