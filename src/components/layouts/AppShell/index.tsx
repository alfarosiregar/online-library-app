import Footer from "../../fragments/Footer";
import { useRouter } from "next/router";
import { Roboto } from "next/font/google";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("../../fragments/Navbar"), { ssr: false });

type AppShellProps = {
  children: React.ReactNode;
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
});

const AppShell = ({ children }: AppShellProps) => {
  const disableNavbarAndFooter = ["auth", "admin", "404"];
  const { pathname } = useRouter();
  return (
    <main className={roboto.className}>
      {!disableNavbarAndFooter.includes(pathname.split("/")[1]) && <Navbar />}
      {children}
      {!disableNavbarAndFooter.includes(pathname.split("/")[1]) && <Footer />}
    </main>
  );
};

export default AppShell;
