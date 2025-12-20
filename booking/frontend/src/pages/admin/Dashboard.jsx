import React, { useEffect, useState } from "react";
import UsersChart from "../../components/charts/UsersChart";

function DashboardStats() {
  const [usersCount, setUsersCount] = useState(0);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("http://127.0.0.1:8000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setUsersCount(data.length);
    };

    fetchUsers();
  }, [token]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">Total Users</h2>
          <p className="text-3xl font-bold mt-2">{usersCount}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">Revenue</h2>
          <p className="text-3xl font-bold mt-2">$0</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">New Signups</h2>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>
      </div>

      {/* Chart */}
      <UsersChart usersCount={usersCount} />
    </>
  );
}

export default DashboardStats;
