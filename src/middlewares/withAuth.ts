import { getToken } from "next-auth/jwt";
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";

const onlyAdmin = ["admin"];
const authPage = ["auth"];

export default function withAuth(
  middleware: NextMiddleware,
  requireAuth: string[] = [],
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname.split("/")[1]; // Ambil path utama
    const isProtectedRoute = requireAuth.includes(pathname);

    // 🔹 Jika rute tidak butuh autentikasi, lanjutkan middleware
    if (!isProtectedRoute) {
      return middleware(req, next);
    }

    // 🔹 Ambil token dari session
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // 🔹 Jika user tidak punya token, redirect ke login
    if (!token && !authPage.includes(pathname)) {
      const url = new URL("/auth/login", req.url);
      url.searchParams.set("callbackUrl", req.url);
      return NextResponse.redirect(url);
    }

    // 🔹 Jika user sudah login, jangan izinkan masuk ke halaman login lagi
    if (token && authPage.includes(pathname)) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // 🔹 Jika halaman membutuhkan admin & user bukan admin, redirect ke home
    if (token && onlyAdmin.includes(pathname) && token.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // 🔹 Jika lolos semua pemeriksaan, jalankan middleware berikutnya
    return middleware(req, next);
  };
}
