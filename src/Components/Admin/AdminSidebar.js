import Link from "next/link";
import { ADMIN_MOVIES, ADMIN_ROUTE, HOME_ROUTE } from "@/Constants/routes";
import {
  ArrowLeft,
  Clapperboard,
  ClockPlusIcon,
  CreditCard,
  Grid2X2,
  TableOfContents,
  Tickets,
  Users,
} from "lucide-react";
import React from "react";

function AdminSidebar() {
  return (
    <div>
      {/* for left sidebar */}
      <section className="fixed left-0 top-0 flex h-dvh w-60 flex-col bg-primary p-5 gap-4 text-white text-sm border-r border-zinc-800">
        <div className="">
          <span className="flex justify-between font-bold text-xl">
            Admin Panel
            <TableOfContents />
          </span>
        </div>
        <hr className="my-2" />

        <div className="flex flex-col gap-5">

          <Link href={ADMIN_ROUTE}>
          <span className="flex gap-5">
            <Grid2X2 />
            Overview
          </span>
          </Link>

          <Link href={ADMIN_MOVIES}>  
           <span className="flex gap-5">
            <Clapperboard />
            Movies
          </span>
          </Link>
         
          <span className="flex gap-5">
            <Tickets />
            Bookings
          </span>
          <span className="flex gap-5">
            <ClockPlusIcon />
            Showtimes
          </span>
          <span className="flex gap-5">
            <CreditCard />
            Transactions
          </span>
          <span className="flex gap-5">
            <Users />
            Users
          </span>

          <Link href={HOME_ROUTE}>
            <div className="absolute bottom-10 left-5 flex items-center gap-2 cursor-pointer">
              <ArrowLeft />
              Back to Site
            </div>
          </Link>
        </div>
      </section>

      {/* for right side children */}
      <section></section>
    </div>
  );
}

export default AdminSidebar;
