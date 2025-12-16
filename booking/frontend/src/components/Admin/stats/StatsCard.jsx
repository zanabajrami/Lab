import React from "react";

export default function StatsCard({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="mt-2 text-xl font-bold text-gray-700">{value}</p>
    </div>
  );
}
