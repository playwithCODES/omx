
"use client";

import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const data = Array.from({ length: 30 }, (_, index) => ({
  day: index + 1,
  revenue: Math.floor(5000 + Math.random() * 25000),
}));

export default function RevenueChart() {
  return (
    <div className="w-full rounded-xl border border-zinc-800 bg-zinc-900 p-5 text-white">
      <h2 className="mb-5 text-sm font-semibold">
        Revenue — Last 30 Days
      </h2>

      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap={5}>
            <XAxis
              dataKey="day"
              ticks={[1, 10, 20, 30]}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#a1a1aa", fontSize: 11 }}
              tickFormatter={(day) => `Day ${day}`}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#18181b",
                border: "1px solid #3f3f46",
                borderRadius: "8px",
                color: "#ffffff",
              }}
              formatter={(value) => [
                `Rs. ${Number(value).toLocaleString()}`,
                "Revenue",
              ]}
            />

            <Bar dataKey="revenue" radius={[4, 4, 0, 0]}>
              {data.map((item, index) => (
                <Cell
                  key={item.day}
                  fill={
                    index === data.length - 1
                      ? "#22c55e"
                      : "#52525b"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
