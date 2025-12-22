import React, { useEffect, useState } from "react";
import UserGrowthChart from "../../components/charts/UserGrowthChart";
import UsersChart from "../../components/charts/UsersChart";

function Dashboard() {
  const [usersStats, setUsersStats] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsersStats = async () => {
      try {
        const res = await fetch(
          "http://127.0.0.1:8000/api/users/stats/daily",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        setUsersStats(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsersStats();
  }, [token]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">Total Users</h2>
          <p className="text-3xl font-bold mt-2">
            {usersStats.reduce((sum, u) => sum + u.count, 0)}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">Revenue</h2>
          <p className="text-3xl font-bold mt-2">$0</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">New Signups</h2>
          <p className="text-3xl font-bold mt-2">
            {usersStats[usersStats.length - 1]?.count || 0}
          </p>
        </div>
      </div>

      {/* Chart ditore */}
      <UsersChart usersData={usersStats} />

      <div className="p-2 mt-5">
        <UserGrowthChart usersData={usersStats} />
      </div>
    </>
  );
}

export default Dashboard;
