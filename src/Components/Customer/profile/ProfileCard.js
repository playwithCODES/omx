"use client";

import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { MOVIES_ROUTE } from "@/Constants/routes";

import ProfileInfo from "./ProfileInfo";
import BookingHistory from "./BookingHistory";

function ProfileCard() {
  const router = useRouter();

  return (
    <main className="mx-auto mt-5 max-w-7xl px-4">
      <section className="flex flex-col gap-5 md:flex-row">
        <ProfileInfo />
        <BookingHistory />
      </section>

      <section>
        <button
          type="button"
          className="mx-auto mt-20 flex items-center justify-center gap-1 text-primary-500"
          onClick={() => router.push(MOVIES_ROUTE)}
        >
          <MoveLeft />
          Browse Movies
        </button>
      </section>
    </main>
  );
}

export default ProfileCard;