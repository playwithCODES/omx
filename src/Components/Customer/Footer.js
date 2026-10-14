import React from "react";
import { Ticket } from "lucide-react";
import { HOME_ROUTE } from "@/Constants/routes";
import Image from "next/image";
import { LoadingBoundaryProvider } from "next/dist/client/components/layout-router";
import LogoButton from "./LogoButton";

function Footer() {
  return (
    <main>
      {/* for upper section */}
      <hr className="w-full border-t border-gray-500 my-4" />
      <section className="flex justify-between  max-w-7xl mx-auto px-4 ">
        <div className="">
          <LogoButton />

          <div className="text-sm text-gray-500 flex flex-col my-5 gap-3">
            <span>Nepal&apos;s premier cinema experience.</span>
            <span>Book tickets, enjoy the show.</span>
          </div>
          <div className="flex space-x-3 text-sm text-gray-500 text-center">
            <button className="border p-2 rounded-lg ">FB</button>
            <button className="border p-2 rounded-lg ">TW</button>
            <button className="border p-2 rounded-lg">IG</button>
            <button className="border p-2 rounded-lg">YT</button>
          </div>
        </div>

        <div>
          <h1 className="mb-3">Movies</h1>
          <div className="text-gray-500 text-sm  flex flex-col gap-3 ">
            <span>Now Showing</span>
            <span>Coming Soon</span>
            <span>Top Rated</span>
            <span>Premiers</span>
          </div>
        </div>

        <div>
          <h1 className="mb-3">Cinemas</h1>
          <div className="flex flex-col text-gray-500  gap-3 text-sm">
            <span>Kathmandu</span>
            <span>Pokhara</span>
            <span>Lalitpur</span>
            <span>Biratnagar</span>
          </div>
        </div>

        <div>
          <h1 className="mb-3">Support</h1>
          <div className="flex flex-col gap-3 text-gray-500 text-sm">
            <span>Help Center</span>
            <span>Contact Us</span>
            <span>Refund Policy</span>
            <span>Terms & Conditions</span>
            <span>Privacy Policy</span>
          </div>
        </div>
      </section>

      {/* for lower section */}
      <hr className="w-full border-t border-gray-500 my-4" />
      <section className="max-w-7xl mx-auto my-2 px-4 flex justify-between">
        <div className=" text-sm text-gray-400">
          {" "}
          © {new Date().getFullYear()} OMX Cinemas Pvt. Ltd. All rights
          reserved.
        </div>
        <div className="flex gap-2">
          <Image
            className=""
            src="/images/Hall.png"
            height={30}
            width={30}
            alt="OMX Cinema Hall"
          />

          <div className="text-sm text-gray-500  flex gap-3">
            <span> eSewa · Khalti · FonePay</span>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Footer;
