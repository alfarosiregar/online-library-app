"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Users,
  Settings,
  Menu,
  ChevronRight,
  LayoutGrid,
  UserPen,
  SwatchBook,
  Home,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

const sidebarLinks = [
  { name: "Home", href: "/admin", icon: Home },
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutGrid },
  { name: "Buku", href: "/admin/books", icon: SwatchBook },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Profile", href: "/admin/profile", icon: UserPen },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { pathname } = useRouter();
  return (
    <motion.aside
      animate={{ width: isExpanded ? 250 : 80 }}
      className="h-screen bg-gray-900 text-white p-4 flex flex-col"
    >
      {/* Toggle Button */}
      <motion.div className="flex justify-around items-center mb-4 gap-x-2">
        <div className="flex items-center">
          <Image
            src="/logo.png"
            alt="Logo"
            width={64}
            height={64}
            className={cn("text-lg font-bold", !isExpanded && "hidden")}
          />
          <h5 className={cn("text-lg font-bold", !isExpanded && "hidden")}>
            Library
          </h5>
        </div>
        <Button
          variant="destructive"
          className="flex items-center gap-2 px-3 py-2 text-white hover:bg-gray-700 transition-all"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <motion.div
            animate={{ rotate: isExpanded ? 0 : 369 }}
            transition={{ duration: 0.5 }}
          >
            {isExpanded ? (
              <Menu className="w-6 h-6" />
            ) : (
              <ChevronRight className="w-6 h-6" />
            )}
          </motion.div>
        </Button>
      </motion.div>

      <Separator className="bg-gray-700" />

      {/* Navigation Links */}
      <nav className="mt-4 space-y-2 flex-1">
        {sidebarLinks.map(({ name, href, icon: Icon }) => (
          <Link
            key={name}
            href={href}
            className={cn(
              "flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition-all",
              !isExpanded && "justify-center",
              pathname === href && "bg-gray-800",
            )}
          >
            <Icon className="w-5 h-5" />
            {isExpanded && (
              <motion.span animate={{ opacity: isExpanded ? 1 : 0 }}>
                {name}
              </motion.span>
            )}
          </Link>
        ))}
      </nav>

      <Separator className="bg-gray-700" />

      {/* Footer Section */}
      <motion.div
        animate={{ opacity: isExpanded ? 1 : 0 }}
        className={cn(
          "mt-3 text-sm text-gray-400 mx-auto",
          !isExpanded && "hidden",
        )}
      >
        <Button
          type="button"
          variant="secondary"
          onClick={() => signOut()}
          className="w-full my-5"
        >
          <LogOut />
          Logout
        </Button>
        <p>© 2025 Online Library</p>
      </motion.div>
    </motion.aside>
  );
};

export default Sidebar;
