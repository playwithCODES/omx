import {
  CalendarRangeIcon,
  CircleDollarSign,
  Clapperboard,
  Tickets,
} from "lucide-react";
import React from 'react'

function StatCard() {
  return (
      <div className="grid gap-4 grid-cols-4 mt-5  ">
        <div className="flex flex-col border  rounded-lg p-4">
          <div className="flex justify-between mb-4">
            <span className="text-sm text-gray-400">Total Revenue</span>
            <span className="text-primary">
              <CircleDollarSign />
            </span>
          </div>

          <span className="text-white font-extrabold">Rs 999999</span>
          <span className="text-primary text-sm">+50 % this month</span>
        </div>

        <div className="flex flex-col border  rounded-lg p-4">
          <div className="flex justify-between mb-4">
            <span className="text-sm text-gray-400">Total Bookings</span>
            <span className="text-primary">
              <Tickets />
            </span>
          </div>

          <span className="text-white font-extrabold">1847</span>
          <span className="text-primary text-sm">+8.2 % this month</span>
        </div>

        <div className="flex flex-col border  rounded-lg p-4">
          <div className="flex justify-between mb-4">
            <span className="text-sm text-gray-400">Active Movies</span>
            <span className="text-primary">
              <Clapperboard />
            </span>
          </div>

          <span className="text-white font-extrabold">12</span>
          <span className="text-primary text-sm">+2 % this month</span>
        </div>

        <div className="flex flex-col border rounded-lg p-4">
          <div className="flex justify-between mb-4">
            <span className="text-sm text-gray-400">Upcoming Shows</span>
            <span className="text-primary">
              <CalendarRangeIcon />
            </span>
          </div>

          <span className="text-white font-extrabold">Rs 999999</span>
          <span className="text-primary text-sm">+50 % this month</span>
        </div>
      </div>
  )
}

export default StatCard
