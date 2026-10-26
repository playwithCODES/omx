"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Ticket, User } from "lucide-react";
import { ADMIN_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE } from "@/Constants/routes";

import {
  HOME_ROUTE,
  MOVIES_ROUTE,
  CINEMAS_ROUTE,
  OFFERS_ROUTE,
} from "@/Constants/routes";
import LogoButton from "./LogoButton";

const Header = () => {
  const navItems = [
    {
      name: "Home",
      href: HOME_ROUTE,
    },
    {
      name: "Movies",
      href: MOVIES_ROUTE,
    },
    {
      name: "Cinemas",
      href: CINEMAS_ROUTE,
    },
    {
      name: "Offers",
      href: OFFERS_ROUTE,
    },
  ];

  const [user, setUser] = useState(null);
  useEffect(() => {
    const updateUser = () => {
      const savedUser = sessionStorage.getItem("omx_admin_user");
      setUser(savedUser ? JSON.parse(savedUser) : null);
    };
    updateUser();
    window.addEventListener("omx-auth-change", updateUser);
    return () => {
      window.removeEventListener("omx-auth-change", updateUser);
    };
  }, []);
  console.log("user", user);

  return (
    <header className="dark:bg-black text-black dark:text-white shadow-xl dark:shadow-2xl  border-gray-700">
      <nav className="max-w-7xl mx-auto px-4 ">
        <div className=" flex  items-center justify-between  py-3">
          <LogoButton />

          {/* Navigation */}
          <div className="hidden w-full md:block md:w-auto">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
              {navItems.map((navItem) => (
                <li key={navItem.href}>
                  <Link href={navItem.href} className="block py-2 px-3">
                    {navItem.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex gap-5">
            <select className="text-black rounded-sm px-2 py-1 bg-white dark:text-white dark:bg-black">
              <option value="kathmandu">Kathmandu</option>
              <option value="biratnagar">Biratnagar</option>
              <option value="pokhara">Pokhara</option>
              <option value="lalitpur">Lalitpur</option>
            </select>

            {user && user.roles?.includes("ADMIN") && (
              <Link href={ADMIN_ROUTE}>
                <button className="bg-primary justify-between items-center px-3 py-1 rounded-sm text-white dark:text-white">
                  Admin
                </button>
              </Link>
            )}
            {user && (
              <Link href={PROFILE_ROUTE}>
                <User />
              </Link>
            )}

            {!user && (
              <Link href={LOGIN_ROUTE}>
                <button>Login</button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
