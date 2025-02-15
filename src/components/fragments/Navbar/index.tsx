import { motion } from "framer-motion";
import { Menu, X, Home, BookOpen, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

const mobileMenuVariants = {
  hidden: { x: "-100%" },
  visible: {
    x: 0,
    transition: { type: "spring", stiffness: 120, damping: 15 },
  },
  exit: { x: "-100%", transition: { duration: 0.3 } },
};

const Navbar = () => {
  const { data }: any = useSession();
  const { pathname } = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Navbar */}
      <motion.div
        className={`fixed top-0 left-0 w-full z-50 px-6 py-3 transition-all ${
          isScrolled
            ? "backdrop-blur-lg bg-gray-500/30 shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Tombol Menu Mobile */}
          <Button
            variant="ghost"
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <motion.div
              animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <Menu className="w-9 h-9" />
            </motion.div>
          </Button>

          {/* Logo di Desktop, Ikon Profil/Login di Mobile */}
          <Link
            href="/"
            className="flex items-center gap-2 text-white font-bold text-lg"
          >
            <Image
              src="/logo.png"
              alt="Logo"
              width={50}
              height={50}
              className="rounded-md hidden md:block"
            />
          </Link>

          {/* Links untuk Desktop */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className={`text-black font-semibold hover:text-gray-700 transition ${
                pathname === "/" ? "text-red-400" : ""
              }`}
            >
              Home
            </Link>
            <Link
              href="/books"
              className={`text-black font-semibold hover:text-gray-700 transition ${
                pathname === "/books" ? "text-red-400" : ""
              }`}
            >
              Books
            </Link>
            {data && (
              <Link
                href="/admin"
                className={`text-black font-semibold hover:text-gray-700 transition ${
                  pathname === "/admin" ? "text-red-400" : ""
                }`}
              >
                Admin
              </Link>
            )}
          </nav>

          {/* Tombol Auth */}
          <div className="hidden md:flex items-center gap-4">
            {data ? (
              <Button
                onClick={() => signOut()}
                variant="destructive"
                className="border"
              >
                <LogOut className="mr-2" />
                Logout
              </Button>
            ) : (
              <Button
                onClick={() => signIn()}
                className="bg-green-500 hover:bg-green-600"
              >
                <User className="mr-1" />
                Login
              </Button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <>
          {/* Overlay untuk menutup menu */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Menu Sidebar Mobile dari KIRI */}
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed left-0 top-0 h-full w-64 bg-gray-900 font-bold text-white p-5 z-50 flex flex-col"
          >
            <div className="flex justify-between items-center mb-6">
              <h5 className="text-xl font-semibold">Menu</h5>
              <Button
                variant="ghost"
                className="text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="w-6 h-6" />
              </Button>
            </div>

            <nav className="space-y-4">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition font-semibold ${
                  pathname === "/" ? "bg-gray-800" : ""
                }`}
              >
                <Home className="w-5 h-5" /> Home
              </Link>
              <Link
                href="/books"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition font-semibold ${
                  pathname === "/books" ? "bg-gray-800" : ""
                }`}
              >
                <BookOpen className="w-5 h-5" /> Books
              </Link>
              {data && (
                <Link
                  href="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition font-semibold ${
                    pathname === "/admin" ? "bg-gray-800" : ""
                  }`}
                >
                  <User className="w-5 h-5" /> Admin
                </Link>
              )}
            </nav>

            <div className="mt-auto">
              {data ? (
                <Button
                  onClick={() => signOut()}
                  className="w-full mt-6 bg-red-500 hover:bg-red-600"
                >
                  <LogOut className="mr-2" /> Logout
                </Button>
              ) : (
                <Button
                  onClick={() => signIn()}
                  className="w-full mt-6 bg-green-500 hover:bg-green-600"
                >
                  <User className="mr-1" />
                  Login
                </Button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </>
  );
};

export default Navbar;
