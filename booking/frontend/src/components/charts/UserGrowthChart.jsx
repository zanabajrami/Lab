import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";

const UserGrowthChart = ({ usersData }) => {
  const monthlyData = usersData.reduce((acc, current) => {
    const date = new Date(current.date);
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    const label = `${month} ${year}`;

    const existingMonth = acc.find(item => item.name === label);

    if (existingMonth) {
      existingMonth.count += current.count;
    } else {
      acc.push({ name: label, count: current.count });
    }
    return acc;
  }, []);

  // 2. Marrja e vetëm 5 muajve të fundit
  const lastFiveMonths = monthlyData.slice(-5);

  return (
    <div
      className="
    bg-white rounded-xl shadow
    p-4 sm:p-6 lg:p-6
    h-[260px] sm:h-[360px] lg:h-[300px]
    w-full lg:max-w-[570px]
    border border-gray-100
  "
    >
      <h3 className="text-lg font-bold text-gray-800 mb-2">
        Monthly User Growth
      </h3>

      {/* WRAPPER me HEIGHT */}
      <div className="mx-auto w-full h-[180px] sm:h-[260px] lg:h-[220px] -ml-7">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={lastFiveMonths}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />

            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 12 }}
              dy={10}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 12 }}
            />

            <Tooltip
              cursor={{ fill: "#f9fafb" }}
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)"
              }}
            />

            <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={60}>
              {lastFiveMonths.map((_, index) => (
                <Cell
                  key={index}
                  fill={
                    index === lastFiveMonths.length - 1
                      ? "#29232eff"
                      : "#60a5fa"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>

  );
};

export default UserGrowthChart;