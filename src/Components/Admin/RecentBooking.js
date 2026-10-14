"use client";

const bookings = [
  {
    id: "OMX4A2BF1",
    user: "Aarav Sharma",
    movie: "Interstellar: Redux",
    cinema: "OMX Kathmandu",
    seats: 2,
    total: 1068,
    status: "confirmed",
    time: "2 min ago",
  },
  {
    id: "OMX9C3DE2",
    user: "Priya Thapa",
    movie: "Eternal Echoes",
    cinema: "OMX Pokhara",
    seats: 3,
    total: 1534,
    status: "confirmed",
    time: "14 min ago",
  },
  {
    id: "OMX2B7GH3",
    user: "Rahul Patel",
    movie: "The Dark Meridian",
    cinema: "OMX Lalitpur",
    seats: 1,
    total: 510,
    status: "pending",
    time: "31 min ago",
  },
  {
    id: "OMX5E1IJ4",
    user: "Sita Rai",
    movie: "Neon Genesis",
    cinema: "OMX Kathmandu",
    seats: 4,
    total: 2100,
    status: "confirmed",
    time: "1h ago",
  },
  {
    id: "OMX8F6KL5",
    user: "Bikash Gurung",
    movie: "Interstellar: Redux",
    cinema: "OMX Biratnagar",
    seats: 2,
    total: 860,
    status: "cancelled",
    time: "2h ago",
  },
];

export default function RecentBooking() {
  return (
    <section className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 text-white">
      <div className="border-b border-zinc-800 p-4">
        <h2 className="text-sm font-semibold">Recent Bookings</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-zinc-800 text-zinc-500">
            <tr>
              <th className="px-3 py-3 font-normal">Booking ID</th>
              <th className="px-3 py-3 font-normal">User</th>
              <th className="px-3 py-3 font-normal">Movie</th>
              <th className="px-3 py-3 font-normal">Cinema</th>
              <th className="px-3 py-3 font-normal">Seats</th>
              <th className="px-3 py-3 font-normal">Total</th>
              <th className="px-3 py-3 font-normal">Status</th>
              <th className="px-3 py-3 font-normal">Time</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr
                key={booking.id}
                className="border-b border-zinc-800 transition-colors hover:bg-zinc-800/50"
              >
                <td className="whitespace-nowrap px-3 py-4 text-blue-300">
                  {booking.id}
                </td>

                <td className="whitespace-nowrap px-3 py-4 font-medium">
                  {booking.user}
                </td>

                <td className="whitespace-nowrap px-3 py-4 font-medium">
                  {booking.movie}
                </td>

                <td className="whitespace-nowrap px-3 py-4 text-zinc-400">
                  {booking.cinema}
                </td>

                <td className="px-3 py-4">{booking.seats}</td>

                <td className="whitespace-nowrap px-3 py-4 font-semibold">
                  Rs. {booking.total}
                </td>

                <td className="px-3 py-4">
                  <span
                    className={`rounded-md border px-2 py-1 text-[10px] ${
                      booking.status === "confirmed"
                        ? "border-emerald-800 bg-emerald-950 text-emerald-400"
                        : booking.status === "pending"
                          ? "border-green-700 bg-green-950 text-green-400"
                          : "border-red-800 bg-red-950 text-red-400"
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>

                <td className="whitespace-nowrap px-3 py-4 text-zinc-500">
                  {booking.time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
