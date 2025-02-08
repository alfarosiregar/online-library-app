import { Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

export default function Footer() {
  return (
    <footer className="bg-background border-t mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <Image src="/favicon.ico" alt="Logo" width={32} height={32} />
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
              Tentang Kami
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
        <div className="mt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Online Library . Hak Cipta Dilindungi.
        </div>
      </div>
    </footer>
  );
}
