import Link from "next/link";
import { Ticket, User } from "lucide-react";
import { PROFILE_ROUTE } from "@/Constants/routes";

import {
  HOME_ROUTE,
  MOVIES_ROUTE,
  CINEMAS_ROUTE,
  OFFERS_ROUTE,
} from "@/Constants/routes";
import Image from "next/image";

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

  return (
    <header className="dark:bg-gray-700 text-black dark:text-white shadow-xl dark:shadow-2xl  border-gray-700">
       <nav className="max-w-7xl mx-auto px-4 ">
      <div className=" flex  items-center justify-between  py-3">
        <div className="flex gap-2">
          {/* Logo */}
          <Link
            href={HOME_ROUTE}
            className="bg-primary-500 w-10 h-10 rounded-lg flex items-center justify-center"
          >
            <Ticket className="w-5 h-5 text-black" />
          </Link>
          <Link href={HOME_ROUTE} className="flex items-center space-x-3">
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
              OMX <span className="text-primary-500">Cinemas</span>
            </span>
          </Link>
        </div>

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
        <div>
          <Link href={PROFILE_ROUTE}> <User/></Link>
         

        </div>
       <button className="bg-primary-500 justify-between items-center px-3 py-1 rounded-sm text-black dark:text-white">Admin</button>

        </div>
       
      </div>
    </nav>

    </header>
   
  );
};

export default Header;
