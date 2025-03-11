import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { motion } from "framer-motion";
import {
  Home,
  BookOpen,
  User,
  LogOut,
  Menu,
  User2,
  Settings,
  History,
  BookOpenCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navbar = () => {
  const { data }: any = useSession();
  const { pathname } = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Navbar Desktop */}
      <motion.div
        className={`fixed top-0 left-0 w-full z-50 px-6 py-3 transition-all ${
          isScrolled
            ? "backdrop-blur-lg bg-gray-500/30 shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-6 text-md">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 text-white font-bold text-lg mr-6"
            >
              <Image
                src="/logo.png"
                alt="Logo"
                width={60}
                height={60}
                className="rounded-md hidden md:block"
              />
            </Link>

            <Link
              href="/"
              className={`flex gap-2 text-black font-semibold hover:text-gray-700 transition ${pathname === "/" ? "text-gray-500" : ""}`}
            >
              <Home />
              Beranda
            </Link>

            <Link
              href="/buku"
              className={`flex gap-2 text-black font-semibold hover:text-gray-700 transition ${pathname === "/buku" ? "text-gray-500" : ""}`}
            >
              <BookOpen />
              Buku
            </Link>

            {data?.user && (
              <Link
                href="/pinjaman"
                className={`flex gap-2 text-black font-semibold hover:text-gray-700 transition ${pathname === "/pinjaman" ? "text-gray-500" : ""}`}
              >
                <BookOpenCheck />
                Pinjaman
              </Link>
            )}

            {data?.user && (
              <Link
                href="/riwayat"
                className={`flex gap-2 text-black font-semibold hover:text-gray-700 transition ${pathname === "/riwayat" ? "text-gray-500" : ""}`}
              >
                <History />
                Riwayat
              </Link>
            )}

            {data?.user && (
              <Link
                href="/settings"
                className={`flex gap-2 text-black font-semibold hover:text-gray-700 transition ${pathname === "/settings" ? "text-gray-500" : ""}`}
              >
                <Settings />
                Settings
              </Link>
            )}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4 flex items-center">
            {data?.user?.role === "admin" && (
              <Link
                href="/admin"
                className={`text-black flex gap-2 mr-5 font-semibold hover:text-gray-700 transition ${pathname === "/admin" ? "text-gray-500" : ""}`}
              >
                <User />
                Admin
              </Link>
            )}
            {data?.user?.role === "member" && (
              <Link
                href="/profile"
                className={`text-black flex gap-2 mr-5 font-semibold hover:text-gray-700 transition ${pathname === "/profile" ? "text-gray-500" : ""}`}
              >
                <User2 />
                {data.user.fullname}
              </Link>
            )}
            {data?.user ? (
              <Button
                onClick={() => signOut()}
                variant="destructive"
                className="border"
              >
                <LogOut className="mr-2" /> Logout
              </Button>
            ) : (
              <Button
                onClick={() => signIn()}
                className="bg-green-500 hover:bg-green-600"
              >
                <User className="mr-1" /> Login
              </Button>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="md:hidden">
                <Menu size={32} className="text-gray-900 text-3xl" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 bg-white">
              <div className="flex flex-col gap-4 p-4">
                {data ? (
                  <div className="flex flex-col items-center">
                    <Image
                      src={data.user.avatarUrl || "/avatar-male.jpg"}
                      alt="Profile Picture"
                      width={64}
                      height={64}
                      className="rounded-full border shadow"
                    />
                    <p className="text-lg font-semibold text-gray-900 mt-2 text-center">
                      {data.user.name || data.user.fullname}
                    </p>
                  </div>
                ) : (
                  <div>
                    <Image
                      src="/login-first.png"
                      alt="Login First"
                      width={200}
                      height={200}
                    />
                    <p className="text-sm text-center text-gray-600 font-semibold">
                      Silahkan login terlebih dahulu
                    </p>
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-between mt-5">
                <div className="flex flex-col gap-y-5">
                  {data?.user?.role === "admin" && (
                    <Link
                      href="/admin"
                      className={`text-md flex gap-2 font-semibold ${pathname === "/admin" ? "text-gray-500" : ""}`}
                    >
                      <User2 />
                      Admin
                    </Link>
                  )}
                  {data?.user?.role === "member" && (
                    <Link
                      href="/profile"
                      className={`text-md flex gap-2 font-semibold ${pathname === "/profile" ? "text-gray-500" : ""}`}
                    >
                      <User2 />
                      Profile
                    </Link>
                  )}
                  {data?.user && (
                    <Link
                      href="/pinjaman"
                      className={`text-md flex gap-2 font-semibold ${pathname === "/pinjaman" ? "text-gray-500" : ""}`}
                    >
                      <BookOpenCheck />
                      Pinjaman
                    </Link>
                  )}
                  {data?.user && (
                    <Link
                      href="/riwayat"
                      className={`text-md flex gap-2 font-semibold ${pathname === "/riwayat" ? "text-gray-500" : ""}`}
                    >
                      <History />
                      Riwayat
                    </Link>
                  )}
                  {data?.user && (
                    <Link
                      href="/settings"
                      className={`text-md flex gap-2 font-semibold ${pathname === "/settings" ? "text-gray-500" : ""}`}
                    >
                      <Settings />
                      Settings
                    </Link>
                  )}
                </div>
                <div className="flex flex-col mt-3">
                  {data ? (
                    <Button
                      onClick={() => signOut()}
                      variant="destructive"
                      className="mt-4"
                    >
                      <LogOut className="mr-2" /> Logout
                    </Button>
                  ) : (
                    <Button
                      onClick={() => signIn()}
                      className="mt-4 bg-green-500 hover:bg-green-600"
                    >
                      <User className="mr-1" /> Login
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </motion.div>

      {/* Mobile Bottom Navbar */}
      <div className="fixed bottom-0 left-0 w-full bg-gray-900 text-white flex justify-around items-center py-3 md:hidden z-50 shadow-md">
        <Link
          href="/"
          className={`flex flex-col items-center ${pathname === "/" ? "text-green-400" : "text-white"}`}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link
          href="/buku"
          className={`flex flex-col items-center ${pathname === "/buku" ? "text-green-400" : "text-white"}`}
        >
          <BookOpen className="w-6 h-6" />
          <span className="text-xs mt-1">Buku</span>
        </Link>
        {data ? (
          <button
            onClick={() => signOut()}
            className="flex flex-col items-center text-red-400"
          >
            <LogOut className="w-6 h-6" />
            <span className="text-xs mt-1">Logout</span>
          </button>
        ) : (
          <button
            onClick={() => signIn()}
            className="flex flex-col items-center text-white"
          >
            <User className="w-6 h-6" />
            <span className="text-xs mt-1">Login</span>
          </button>
        )}
      </div>
    </>
  );
};

export default Navbar;
