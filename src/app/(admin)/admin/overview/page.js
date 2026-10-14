
import RecentBooking from "@/Components/Admin/RecentBooking";
import RevenueChart from "@/Components/Admin/RevenueChart";
import StatCard from "@/Components/Admin/StatCard";
import React from "react";

function OverviewPage() {
  return (
    <div className="flex flex-col gap-5 w-auto">
      {/* for top button and spans */}
      <div className="flex justify-between h-8 ">
        <div>
          <h1 className=" dark:text-white font-bold">Overview</h1>
          <span>OMX Cinemas Management</span>
        </div>
        <button className="border rounded-md text-sm px-2">Export CSV</button>
      </div>

      {/* for 4 statcards */}
      <StatCard/>

      {/* for bar graph showing revenues */}
      <RevenueChart/>

      {/* for recent bookings */}
      <RecentBooking/>
     
    </div>
  );
}

export default OverviewPage;
