import { Play } from "lucide-react";
import React from "react";
import Link from "next/link";

function BannerText() {
  return (
    <div className="mt-5 flex flex-col gap-3 w-150 text-white">
      <div className="text-sm ">
        <span className=" border border-primary bg-primary rounded-xl p-2 mr-4">
          Now Showing
        </span>
        <span>Sci-Fi . Drama</span>
      </div>
      <h1 className=" text-5xl font-bold">Interstellar: Redux</h1>
      <div>
        <span className="text-sm">2h 49m</span>
        <span className="border border-primary px-2 py-1 w-10 rounded-xl text-sm ml-2">
          pg-13
        </span>
      </div>

      <p className="text-sm">
        A team of explorers travel through a wormhole in space in an attempt to
        ensure humanity&apos;s survival. When Earth&apos;s agricultural
        resources are depleted, a former
      </p>
      <div className="flex gap-4">
        <button className="bg-primary border border-primary px-3 py-2 rounded-xl">
          Book Now
        </button>
        
        <Link
          href="https://youtu.be/zSWdZVtXT7E?si=8PJYEX8Dt6yD2bzb"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="flex items-center gap-2 border border-primary px-3 py-2 rounded-xl">
            <Play size={18} />
            Trailer
          </button>
        </Link>
        
      </div>
    </div>
  );
}

export default BannerText;
