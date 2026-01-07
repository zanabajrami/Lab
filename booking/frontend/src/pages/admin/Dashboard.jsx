import React, { useEffect, useState } from "react";
import UserGrowthChart from "../../components/charts/UserGrowthChart";
import UsersChart from "../../components/charts/UsersChart";
import { Users, DollarSign, UserPlus } from "lucide-react";

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

        {/* TOTAL USERS */}
        <div className="bg-white p-6 rounded-xl shadow flex justify-between items-center">
          <div>
            <h2 className="text-gray-500 text-sm">Total Users</h2>
            <p className="text-3xl font-bold mt-1">
              {summary?.total_users ?? 0}
            </p>
            <span className="text-slate-600 text-sm">
              ▲ 12% this month
            </span>
          </div>
          <div className="bg-indigo-100 p-3 rounded-full">
            <Users className="text-blue-900 w-6 h-6" />
          </div>
        </div>

        {/* REVENUE */}
        <div className="bg-white p-6 rounded-xl shadow flex justify-between items-center">
          <div>
            <h2 className="text-gray-500 text-sm">Revenue</h2>
            <p className="text-3xl font-bold mt-1">$0</p>
            <span className="text-gray-400 text-sm">
              No data yet
            </span>
          </div>
          <div className="bg-green-100 p-3 rounded-full">
            <DollarSign className="text-green-600 w-6 h-6" />
          </div>
        </div>

        {/* NEW USERS TODAY */}
        <div className="bg-white p-6 rounded-xl shadow flex justify-between items-center">
          <div>
            <h2 className="text-gray-500 text-sm">New Users Today</h2>
            <p className="text-3xl font-bold mt-1">
              {summary?.today ?? 0}
            </p>
            <span className="text-slate-600 text-sm">
              + Today
            </span>
          </div>
          <div className="bg-purple-100 p-3 rounded-full">
            <UserPlus className="text-purple-600 w-6 h-6" />
          </div>
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