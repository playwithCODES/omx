
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

import {
  CalendarDays,
  Clock3,
  Monitor,
  Armchair,
  Ticket,
  Layers3,
  Heart,
  Barcode,
} from "lucide-react";

import { QRCodeSVG } from "qrcode.react";
import { getMyBookingsUrl } from "@/lib/apiEndpoints";

function TicketPage() {
  const params = useParams();
  const bookingId = params.bookingId;

  const [booking, setBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const token = sessionStorage.getItem("omx_admin_token");

        if (!token) {
          throw new Error("Please log in to view your ticket.");
        }

        const response = await fetch(getMyBookingsUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch booking details.");
        }

        const bookings = await response.json();

        const selectedBooking = bookings.find(
          (item) => item._id === bookingId
        );

        if (!selectedBooking) {
          throw new Error("Ticket not found.");
        }

        setBooking(selectedBooking);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setIsLoading(false);
      }
    };

    if (bookingId) {
      fetchBooking();
    }
  }, [bookingId]);

  if (isLoading) {
    return (
      <main className="p-5 text-center text-sm text-gray-500">
        Loading ticket...
      </main>
    );
  }

  if (error) {
    return (
      <main className="p-5 text-center text-sm text-red-600">
        {error}
      </main>
    );
  }

  const movie = booking.showId?.movieId;
  const show = booking.showId;
  const cinema = show?.cinemaId;
  const hall = show?.hallId;
  const seats = booking.seatIds || [];

  const showDate = show?.date
    ? new Date(show.date).toLocaleDateString("en-GB", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
        timeZone: "Asia/Kathmandu",
      })
    : "Unavailable";

  const seatNumbers = seats
    .map((seat) => seat.seatNumber)
    .filter(Boolean)
    .join(", ");

  const seatCategories = [
    ...new Set(
      seats
        .map((seat) =>
          typeof seat.category === "object"
            ? seat.category?.name
            : null
        )
        .filter(Boolean)
    ),
  ];

  const seatCategory = seatCategories.join(", ") || "Standard";

  const formattedAmount = new Intl.NumberFormat("en-NP", {
    maximumFractionDigits: 2,
  }).format(booking.totalAmount ?? 0);

  return (
    <main className="mx-auto w-full max-w-200 px-3 py-4">
      <div
        id="movie-ticket"
        className="overflow-hidden rounded-lg border-2 border-red-800 bg-white text-black shadow-sm"
      >
        {/* Compact header */}
        <header className="flex items-center justify-between gap-3 px-4 py-2.5">
          <div className="flex items-center gap-3">
            <div className="shrink-0 text-4xl font-black leading-none tracking-tighter">
              OM<span className="text-red-800">X</span>
              <div className="mt-0.5 text-center text-[9px] tracking-[0.3em]">
                CINEMAS
              </div>
            </div>

            <div className="hidden border-l-2 border-gray-300 pl-3 text-xs leading-4 sm:block">
              Movies
              <br />
              Make
              <br />
              Better People
            </div>
          </div>

          <div className="min-w-0 text-right">
            <h1 className="wrap-break-words text-sm font-bold sm:text-base">
              {cinema?.name || "OMX Cinemas"}
            </h1>
            <p className="mt-0.5 text-[10px] text-gray-600">
              www.omxcinemas.com.np
            </p>
          </div>
        </header>

        {/* Main ticket: three columns */}
        <section className="grid grid-cols-1 gap-3 px-3 pb-3 sm:grid-cols-[120px_minmax(0,1fr)_145px] sm:gap-3 sm:px-3">
          {/* Movie poster */}
          <div className="relative mx-auto aspect-2/3 w-full max-w-26.25 overflow-hidden rounded-md bg-gray-100 sm:mx-0 sm:max-w-none">
            {movie?.poster?.url ? (
              <Image
                src={movie.poster.url}
                alt={movie.name || "Movie poster"}
                fill
                sizes="120px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center p-2 text-center text-[10px] text-gray-500">
                Poster unavailable
              </div>
            )}
          </div>

          {/* Movie details */}
          <div className="min-w-0">
            <h2 className="wrap-break-words text-lg font-extrabold leading-tight">
              {movie?.name || "Movie title unavailable"}
            </h2>

            <p className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-600">
              <span>{movie?.genre || "Genre unavailable"}</span>
              <span>|</span>
              <span>{movie?.runtime || "Runtime unavailable"}</span>
            </p>

            <div className="mt-2.5 space-y-1.5">
              <TicketDetail
                icon={<CalendarDays size={14} />}
                label="Date"
                value={showDate}
              />

              <TicketDetail
                icon={<Clock3 size={14} />}
                label="Show Time"
                value={show?.startTime || "Unavailable"}
              />

              <TicketDetail
                icon={<Monitor size={14} />}
                label="Hall"
                value={hall?.name || "Unavailable"}
              />

              <TicketDetail
                icon={<Armchair size={14} />}
                label="Seat(s)"
                value={seatNumbers || "Unavailable"}
              />

              <TicketDetail
                icon={<Layers3 size={14} />}
                label="Seat Type"
                value={seatCategory}
              />

              <TicketDetail
                icon={<Ticket size={14} />}
                label="Booking ID"
                value={booking.bookingCode || booking._id}
              />

              <TicketDetail
                icon={<Barcode size={14} />}
                label="Ticket Code"
                value={booking.bookingCode || booking._id}
              />
            </div>
          </div>

          {/* QR and seat price */}
          <aside className="flex items-center justify-between gap-3 border-t border-gray-200 pt-2 sm:flex-col sm:justify-start sm:border-l sm:border-t-0 sm:pl-3 sm:pt-0">
            <div className="flex flex-col items-center">
              <div className="flex h-[68px] w-[68px] items-center justify-center bg-white">
  <QRCodeSVG
    value={booking.bookingCode || booking._id}
    size={64}
    level="H"
    marginSize={1}
  />
</div>
              <span className="mt-0.5 text-[9px] text-gray-600">
                Scan at Entry
              </span>
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-2 sm:w-full sm:flex-none">
              <div className="rounded-md bg-red-800 px-2 py-2 text-center text-white">
                <p className="wrap-break-words text-sm font-bold">
                  {seatCategory}
                </p>
                <p className="mt-0.5 wrap-break-words text-sm font-bold">
                  {seatNumbers || "Seat not assigned"}
                </p>
              </div>

              <div className="rounded-md border-2 border-red-800 px-2 py-2 text-center text-lg font-extrabold text-red-800">
                NPR {formattedAmount}
              </div>
            </div>
          </aside>
        </section>

        {/* Dashed divider */}
        <div className="border-t-2 border-dashed border-red-800" />

        {/* Compact bottom section */}
        <section className="grid grid-cols-1 gap-3 px-3 py-3 sm:grid-cols-[1fr_1fr_1.2fr] sm:items-center sm:gap-3">
          {/* Booking reference */}
          <div className="min-w-0">
            <p className="text-[10px] font-semibold text-gray-600">
              BOOKING REFERENCE
            </p>
            <p className="mt-1 break-all text-xs font-bold">
              {booking.bookingCode || booking._id}
            </p>
          </div>

          {/* Grand total */}
          <div className="border-y border-gray-200 py-2 text-center sm:border-y-0 sm:border-x sm:px-2">
            <p className="text-sm font-bold text-red-800">
              Grand Total
            </p>
            <p className="mt-0.5 text-2xl font-black text-red-800">
              NPR {formattedAmount}
            </p>
          </div>

          {/* Instructions */}
          <div className="space-y-1 text-[10px] leading-4 text-gray-700">
            <p>• Valid for the selected show only.</p>
            <p>• Please arrive 15 minutes before showtime.</p>
            <p>• Keep your booking reference ready.</p>
            <p className="flex items-center gap-1 pt-1 font-semibold">
              <Heart
                size={12}
                className="shrink-0 fill-red-800 text-red-800"
              />
              Thank you for choosing OMX Cinemas!
            </p>
          </div>
        </section>

        {/* Red branding footer */}
        <footer className="bg-red-800 px-3 py-2.5 text-center text-[10px] tracking-[0.3em] text-white sm:text-xs sm:tracking-[0.4em]">
          WWW.OMXCINEMAS.COM.NP
        </footer>
      </div>

      {/* Print button */}
      <div className="mt-3 flex justify-end print:hidden">
        <button
          type="button"
          onClick={() => window.print()}
          className="rounded-md bg-red-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-900"
        >
          Print Ticket
        </button>
      </div>

      {/* Print only the ticket */}
      <style jsx global>{`
        @media print {
          @page {
            size: auto;
            margin: 5mm;
          }

          body * {
            visibility: hidden;
          }

          #movie-ticket,
          #movie-ticket * {
            visibility: visible;
          }

          #movie-ticket {
            position: absolute;
            top: 0;
            left: 0;
            width: 800px;
            max-width: 100%;
            box-shadow: none !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}</style>
    </main>
  );
}

function TicketDetail({ icon, label, value }) {
  return (
    <div className="grid grid-cols-[15px_70px_minmax(0,1fr)] items-start gap-1.5 text-xs leading-4">
      <span className="mt-0.5 text-gray-700">{icon}</span>
      <span className="text-gray-600">{label}</span>
      <span className="wrap-break-words font-medium text-black">
        {value}
      </span>
    </div>
  );
}

export default TicketPage;
