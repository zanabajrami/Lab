import React, { useEffect, useState } from "react";
import UserGrowthChart from "../../components/charts/UserGrowthChart";
import UsersChart from "../../components/charts/UsersChart";

function Dashboard() {
  const token = localStorage.getItem("token");

  // Daily stats (chart ditor)
  const [dailyStats, setDailyStats] = useState([]);

  // Summary stats (cards)
  const [summary, setSummary] = useState(null);

  // Monthly stats (growth chart)
  const [monthlyStats, setMonthlyStats] = useState([]);

  /* FETCH DAILY STATS */
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/users/stats/daily", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setDailyStats(data))
      .catch(console.error);
  }, [token]);

  /* FETCH SUMMARY STATS */
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/users/stats/active", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setSummary(data))
      .catch(console.error);
  }, [token]);

  /* FETCH MONTHLY STATS */
  useEffect(() => {
    const fetchMonthlyStats = async () => {
      const res = await fetch(
        "http://127.0.0.1:8000/api/users/stats/monthly",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      setMonthlyStats(data);
    };

    fetchMonthlyStats();
  }, [token]);

  <UserGrowthChart usersData={monthlyStats} />


  return (
    <>
      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">Total Users</h2>
          <p className="text-3xl font-bold mt-2">
            {summary?.total_users ?? 0}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">Revenue</h2>
          <p className="text-3xl font-bold mt-2">$0</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">New Signups Today</h2>
          <p className="text-3xl font-bold mt-2">
            {summary?.today ?? 0}
          </p>
        </div>
      </div>

      {/* DAILY USERS CHART */}
      <UsersChart usersData={dailyStats} />

      {/* MONTHLY GROWTH CHART */}
      <div className="p-2 mt-5">
        <UserGrowthChart usersData={monthlyStats} />
      </div>
    </>
  );
}

export default Dashboard;