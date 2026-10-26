"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getMyBookingsUrl } from "@/lib/apiEndpoints";
import { useRouter } from "next/navigation";

function BookingHistory() {
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("upcoming");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = sessionStorage.getItem("omx_admin_token");

        if (!token) {
          setError("Please log in to view your bookings.");
          return;
        }

        const response = await fetch(getMyBookingsUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch bookings.");
        }

        const data = await response.json();
        setBookings(data);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Determine whether a show's start date and time have passed.
  const isUpcoming = (booking) => {
    const date = booking.showId?.date;
    const time = booking.showId?.startTime;

    if (!date || !time) return false;

    // Interpret the show date and 24-hour start time in Nepal time.
    const datePart = date.split("T")[0];
    const showDateTime = new Date(`${datePart}T${time}:00+05:45`);

    if (Number.isNaN(showDateTime.getTime())) return false;

    return showDateTime > new Date();
  };

  const upcomingBookings = bookings.filter(isUpcoming);
  const expiredBookings = bookings.filter((booking) => !isUpcoming(booking));

  const visibleBookings =
    activeTab === "upcoming" ? upcomingBookings : expiredBookings;

  if (isLoading) {
    return <p className="p-5 text-gray-400">Loading bookings...</p>;
  }

  if (error) {
    return <p className="p-5 text-red-400">{error}</p>;
  }

  return (
    <div className="flex min-w-0 flex-1 flex-col">
      {/* Tabs */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setActiveTab("upcoming")}
          className={`rounded-md border px-2 py-1 ${
            activeTab === "upcoming" ? "bg-primary text-black" : "text-white"
          }`}
        >
          Upcoming ({upcomingBookings.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("history")}
          className={`rounded-md border px-2 py-1 ${
            activeTab === "history" ? "bg-primary text-black" : "text-white"
          }`}
        >
          History ({expiredBookings.length})
        </button>
      </div>

      {/* Booking cards */}
      {visibleBookings.length === 0 ? (
        <p className="mt-5 rounded-xl border border-gray-700 p-5 text-gray-400">
          {activeTab === "upcoming"
            ? "No upcoming bookings."
            : "No expired bookings yet."}
        </p>
      ) : (
        visibleBookings.map((booking) => {
          const upcoming = isUpcoming(booking);
          const movie = booking.showId?.movieId;
          const cinema = booking.showId?.cinemaId;
          const hall = booking.showId?.hallId;

          return (
            <div
              key={booking._id}
              className="mt-5 rounded-xl border border-gray-700 bg-black p-5 text-gray-500"
            >
              <div className="flex flex-col gap-4 sm:flex-row">
                {movie?.poster?.url ? (
                  <Image
                    src={movie.poster.url}
                    alt={movie?.name || "Movie poster"}
                    width={70}
                    height={100}
                    className="rounded-xl object-cover"
                  />
                ) : (
                  <div className="flex h-25 w-17.5 shrink-0 items-center justify-center rounded-xl border border-gray-700 text-xs text-gray-500">
                    No poster
                  </div>
                )}

                <div className="flex flex-1 flex-col text-sm text-gray-500">
                  <span className="mb-2 text-lg text-white">
                    {movie?.name || "Movie title unavailable"}
                  </span>

                  <span>
                    {cinema?.name || "Cinema unavailable"}
                    {" — "}
                    {hall?.name || "Hall unavailable"}
                  </span>

                  <span>
                    {booking.showId?.date
                      ? new Date(booking.showId.date).toLocaleDateString(
                          "en-US",
                          {
                            timeZone: "Asia/Kathmandu",
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          },
                        )
                      : "Date unavailable"}
                    {" · "}
                    {booking.showId?.startTime || "Time unavailable"}
                  </span>

                  <span>
                    Seats:{" "}
                    {booking.seatIds?.length
                      ? booking.seatIds
                          .map((seat) => seat.seatNumber)
                          .join(", ")
                      : "No seats available"}
                  </span>
                </div>

                <span
                  className={`h-fit self-start rounded-xl border px-2 py-1 text-sm ${
                    upcoming
                      ? "border-primary bg-primary text-white"
                      : "border-gray-600 bg-gray-800 text-gray-300"
                  }`}
                >
                  {upcoming ? "Upcoming" : "Expired"}
                </span>
              </div>

              <hr className="my-4 w-full border-t border-gray-500" />

              <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                <div>
                  <span>{booking.bookingCode || "N/A"}</span>
                  <span className="ml-3 text-white">
                    Rs {booking.totalAmount ?? 0}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => router.push(`/ticket/${booking._id}`)}
                  // disabled={!upcoming}
                  className="rounded-xl border px-3 py-1 text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  View Ticket
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default BookingHistory;
