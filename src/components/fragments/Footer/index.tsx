import { Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

export default function Footer() {
  return (
    <footer className=" bg-gray-800 text-gray-300 relative z-10 mt-auto">
      <div className="container mx-auto px-4 py-8 pb-[100px] sm:pb-8">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center">
            <Image
              src="/logo.png"
              alt="Logo"
              width={90}
              height={90}
              className="text-lg font-bold"
            />
            <span id="logo" className="font-bold text-lg"></span>
            <Script id="title-script" strategy="lazyOnload">
              {`document.getElementById("logo").textContent = "Online Library";`}
            </Script>
          </div>
          <nav className="flex space-x-4">
            <Link
              href="#"
              className="text-sm hover:underline underline-offset-4"
            >
              Beranda
            </Link>
            <Link
              href="#"
              className="text-sm hover:underline underline-offset-4"
            >
              Tentang Saya
            </Link>
            <Link
              href="#"
              className="text-sm hover:underline underline-offset-4"
            >
              Layanan
            </Link>
            <Link
              href="#"
              className="text-sm hover:underline underline-offset-4"
            >
              Kontak
            </Link>
          </nav>
          <div className="flex space-x-4">
            <Link href="#" aria-label="Facebook">
              <Facebook className="w-5 h-5" />
            </Link>
            <Link href="#" aria-label="Instagram">
              <Instagram className="w-5 h-5" />
            </Link>
            <Link href="#" aria-label="Twitter">
              <Twitter className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
