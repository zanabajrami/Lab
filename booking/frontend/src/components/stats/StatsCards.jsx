import React from "react";
import StatsCard from "./StatsCard";

export default function StatsCards({ users }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
      <StatsCard title="Total Users" value={users.length} />
      <StatsCard
        title="Admins"
        value={users.filter((u) => u.role === "admin").length}
      />
      <StatsCard
        title="Regular Users"
        value={users.filter((u) => u.role !== "admin").length}
      />
      <StatsCard
        title="Latest User"
        value={users.length ? users[users.length - 1].first_name : "-"}
      />
    </div>
  );
}
