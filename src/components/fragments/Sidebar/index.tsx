import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Users,
  Settings,
  Menu,
  ChevronLeft,
  LayoutGrid,
  UserPen,
  SwatchBook,
  Home,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";

const sidebarLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutGrid },
  { name: "Buku", href: "/admin/books", icon: SwatchBook },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Profile", href: "/admin/profile", icon: UserPen },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

type SidebarProps = {
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
};

const Sidebar = ({ isExpanded, setIsExpanded }: SidebarProps) => {
  const { pathname } = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isMobile ? (
        <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white flex justify-around p-2 shadow-lg z-50">
          {sidebarLinks.map(({ name, href, icon: Icon }) => (
            <Link
              key={name}
              href={href}
              className="flex flex-col items-center gap-1"
            >
              <Icon
                className={cn("w-6 h-6", pathname === href && "text-green-400")}
              />
              <span className="text-xs">{name}</span>
            </Link>
          ))}
        </nav>
      ) : (
        <motion.aside
          animate={{ width: isExpanded ? 250 : 80 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="fixed left-0 top-0 h-screen bg-gray-900 text-white p-4 flex flex-col z-50 shadow-lg"
        >
          <div className="flex justify-between items-center mb-4">
            <Image
              src="/logo.png"
              alt="Logo"
              width={64}
              height={64}
              className={cn(!isExpanded && "hidden")}
            />
            <h5 className={cn("text-lg font-bold", !isExpanded && "hidden")}>
              Library
            </h5>
            <Button
              variant="ghost"
              className="text-white"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <ChevronLeft className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
          <Separator className="bg-gray-700" />
          <nav className="mt-4 space-y-2 flex-1">
            {sidebarLinks.map(({ name, href, icon: Icon }) => (
              <Link
                key={name}
                href={href}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700",
                  pathname === href && "bg-gray-800",
                )}
              >
                <Icon className="w-5 h-5" />
                {isExpanded && <span>{name}</span>}
              </Link>
            ))}
          </nav>
          <Separator className="bg-gray-700" />
          <div
            className={cn(
              "mt-3 text-sm text-gray-400",
              !isExpanded && "hidden",
            )}
          >
            <Button
              type="button"
              variant="secondary"
              onClick={() => signOut()}
              className="w-full my-5"
            >
              <LogOut /> Logout
            </Button>
            <p className="text-center">© 2025 Online Library</p>
          </div>
        </motion.aside>
      )}
    </>
  );
};

export default Sidebar;
