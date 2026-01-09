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
  const monthlyData = usersData.map(item => ({
    name: item.month,
    count: item.count,
  }));

  const lastFiveMonths = monthlyData.slice(-5);

  // Custom Tooltip Design
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-white/10 p-3 rounded-xl shadow-2xl">
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">{payload[0].payload.name}</p>
          <p className="text-white text-lg font-black">{payload[0].value} <span className="text-indigo-400 text-xs font-medium">users</span></p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-slate-950 rounded-[2.5rem] p-6 h-[350px] w-full border border-white/5 shadow-2xl">
      <div className="flex items-center justify-between mb-6 px-2">
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight">Growth <span className="text-indigo-500">Trajectory</span></h3>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">Monthly registration analytics</p>
        </div>
        <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-slate-800"></div>
        </div>
      </div>

      <div className="w-full h-[220px] -ml-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={lastFiveMonths}>
            {/* Definojmë Gradientin këtu */}
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity={1} />
                <stop offset="100%" stopColor="#4338ca" stopOpacity={1} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="0" vertical={false} stroke="#ffffff0a" />

            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 11, fontWeight: 600 }}
              dy={15}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 11, fontWeight: 600 }}
              width={40}
            />

            <Tooltip 
                content={<CustomTooltip />} 
                cursor={{ fill: "white", opacity: 0.03 }} 
            />

            <Bar dataKey="count" radius={[10, 10, 0, 0]} barSize={45}>
              {lastFiveMonths.map((_, index) => (
                <Cell
                  key={index}
                  fill={
                    index === lastFiveMonths.length - 1
                      ? "url(#barGradient)" // Muaji aktual me gradient
                      : "#1e293b"            // Muajt e tjerë me Slate 800
                  }
                  className="transition-all duration-500 hover:opacity-80"
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