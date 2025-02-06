import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Navbar = () => {
  const { data }: any = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-black text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl md:text-3xl font-bold">Online Library</h1>

        {/* Menu Mobile (Hamburger Button) */}
        <Button
          className={`block md:hidden text-xl transform transition-transform duration-300 ${
            isMenuOpen ? "rotate-90" : "rotate-0"
          }`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <FontAwesomeIcon icon={faBars} />
        </Button>

        {/* Menu Desktop & Mobile */}
        <div
          className={`absolute md:static top-16 left-0 w-full md:w-auto bg-black md:bg-transparent p-4 md:p-0 ${
            isMenuOpen ? "block" : "hidden"
          } md:flex md:items-center md:gap-6`}
        >
          {/* User Info */}
          <div className="flex items-center gap-2 text-center mx-auto md:mx-0">
            <FontAwesomeIcon icon={faUser} className="text-xl text-gray-500" />
            <p className="max-w-xs truncate">
              {data?.user?.fullname || "Guest"}
            </p>
          </div>

          {/* Logout Button */}
          <Button
            type="button"
            className="bg-gray-600 hover:bg-gray-700 w-full md:w-auto mt-4 md:mt-0"
            onClick={() => (data ? signOut() : signIn())}
          >
            {data ? "Logout" : "Login"}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
