import Link from "next/link";
import { CircleUser, LogIn, Menu, Package2, Search } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

const Navbar = () => {
  const { data }: any = useSession();
  console.log(data);
  const { push } = useRouter();
  function handleLogout() {
    push("/login");
  }

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b border-white/10 bg-white/30 backdrop-blur-lg px-4 md:px-6 mb-10">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href={"/"}
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Package2 className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <Link
          href={"/dashboard"}
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Dashboard
        </Link>
        <Link
          href={"/order"}
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          {data && data.user.role === "seller" ? "Orders" : "Cart"}
        </Link>
        {data && data.user.role === "seller" ? (
          <Link
            href={"/seller"}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Seller
          </Link>
        ) : (
          ""
        )}
        <Link
          href={"/bookList"}
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Book
        </Link>
        <Link
          href={"/customers"}
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Customers
        </Link>
        <Link
          href={"/profile"}
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Profile
        </Link>
        <Link
          href={"/settings"}
          className="text-foreground transition-colors hover:text-foreground"
        >
          Settings
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="border-white/50 bg-white/10 backdrop-blur-lg px-4 md:px-6 mb-8"
        >
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Shopedia</span>
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              Dashboard
            </Link>
            <Link
              href="/bookList"
              className="text-muted-foreground hover:text-foreground"
            >
              Book
            </Link>
            <Link
              href="/profile"
              className="text-muted-foreground hover:text-foreground"
            >
              Profile
            </Link>
            <Link href="#" className="hover:text-foreground">
              Customers
            </Link>
            <Link
              href="/settings"
              className="text-muted-foreground hover:text-foreground"
            >
              Settings
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search book..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
        <p className="cursor-pointer">{data && data.user.username}</p>
        {data ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                {data.user.image ? (
                  <Image
                    src={data.user.image}
                    alt={data.user.name}
                    width={32}
                    height={32}
                    className="h-9 w-9 rounded-full"
                  />
                ) : (
                  <CircleUser className="h-7 w-7" />
                )}

                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                {data ? (
                  <Button
                    onClick={() => signOut()}
                    className="text-sm bg-slate-500 p-2 text-white rounded-lg hover:bg-slate-600"
                  >
                    Logout
                  </Button>
                ) : (
                  <Button
                    onClick={() => signIn()}
                    className="text-sm bg-slate-500 p-2 text-white rounded-lg hover:bg-slate-600"
                  >
                    Login
                  </Button>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex gap-2">
            <Button
              onClick={() => signIn()}
              className="text-sm bg-slate-500 p-2 text-white rounded-lg hover:bg-slate-600"
            >
              Login
            </Button>
            <Link href="/auth/register" className="text-sm">
              <Button className="text-sm bg-sky-500 p-2 text-white rounded-lg hover:bg-sky-600">
                Register
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
