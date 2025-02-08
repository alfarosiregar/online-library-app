import Footer from "../Footer";
import { useRouter } from "next/router";
import { Roboto } from "next/font/google";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("../Navbar"), { ssr: false });

type AppShellProps = {
  children: React.ReactNode;
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
});

const AppShell = ({ children }: AppShellProps) => {
  const disableNavbarAndFooter = ["/login", "/register"];
  const { pathname } = useRouter();
  return (
    <main className={roboto.className}>
      {!disableNavbarAndFooter.includes(pathname) && <Navbar />}
      {children}
      {!disableNavbarAndFooter.includes(pathname) && <Footer />}
    </main>
  );
};

export default AppShell;
