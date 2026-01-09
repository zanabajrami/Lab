import React, { useEffect, useState, useMemo } from "react";
import UserGrowthChart from "../../components/charts/UserGrowthChart";
import UsersChart from "../../components/charts/UsersChart";
import { Users, DollarSign, UserPlus, EllipsisVertical, ArrowUpRight } from "lucide-react";

function Dashboard() {
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([]);
  const [dailyStats, setDailyStats] = useState([]);
  const [summary, setSummary] = useState(null);
  const [monthlyStats, setMonthlyStats] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/users", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(console.error);

    fetch("http://127.0.0.1:8000/api/users/stats/daily", { headers: { Authorization: `Bearer ${token}` } }).then(res => res.json()).then(setDailyStats);
    fetch("http://127.0.0.1:8000/api/users/stats/active", { headers: { Authorization: `Bearer ${token}` } }).then(res => res.json()).then(setSummary);
    fetch("http://127.0.0.1:8000/api/users/stats/monthly", { headers: { Authorization: `Bearer ${token}` } }).then(res => res.json()).then(setMonthlyStats);
  }, [token]);

  const latestUsers = useMemo(() => {
    return [...users]
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 5);
  }, [users]);

  return (
    <div className="p-8 bg-[#f8fafc] min-h-screen text-slate-900 ">

      {/* --- STATS CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        {/* TOTAL USERS - Slate 950 me Indigo Details */}
        <div className="bg-slate-950 p-6 rounded-[2.5rem] border border-white/5 shadow-2xl flex justify-between items-center group hover:bg-slate-900 transition-all duration-500">
          <div>
            <h2 className="text-indigo-300/50 text-[11px] font-bold uppercase tracking-[0.2em]">Total Users</h2>
            <p className="text-4xl font-black text-white mt-2 tracking-tighter">
              {summary?.total_users ?? 0}
            </p>
            <div className="flex items-center gap-1.5 mt-4 text-indigo-200 font-bold text-[10px] bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full w-fit uppercase tracking-wider">
              <ArrowUpRight className="w-3 h-3 text-indigo-400" /> 12% Growth
            </div>
          </div>
          <div className="bg-indigo-950 p-4 rounded-2xl shadow-lg shadow-indigo-500/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
            <Users className="text-white w-6 h-6" />
          </div>
        </div>

        {/* REVENUE - Slate 950 me Subtle Indigo */}
        <div className="bg-slate-950 p-6 rounded-[2.5rem] border border-white/5 shadow-2xl flex justify-between items-center group hover:bg-slate-900 transition-all duration-500">
          <div>
            <h2 className="text-indigo-300/50 text-[11px] font-bold uppercase tracking-[0.2em]">Net Revenue</h2>
            <p className="text-4xl font-black text-white mt-2 tracking-tighter">$0.00</p>
            <p className="text-slate-500 text-[11px] font-medium mt-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-slate-700 rounded-full"></span>
              Awaiting transactions
            </p>
          </div>
          <div className="bg-slate-800 border border-white/5 p-4 rounded-2xl group-hover:border-indigo-500/50 transition-colors duration-500">
            <DollarSign className="text-indigo-300 w-6 h-6" />
          </div>
        </div>

        {/* LIVE TODAY - Slate 950 me Accent Indigo/Emerald */}
        <div className="bg-slate-950 p-6 rounded-[2.5rem] border border-white/5 shadow-2xl flex justify-between items-center group hover:bg-slate-900 transition-all duration-500">
          <div>
            <h2 className="text-indigo-300/50 text-[11px] font-bold uppercase tracking-[0.2em]">New Users</h2>
            <p className="text-4xl font-black text-white mt-2 tracking-tighter">
              {summary?.today ?? 0}
            </p>
            <div className="flex items-center gap-1.5 mt-4 text-indigo-200 font-bold text-[10px] bg-white/5 border border-white/10 px-3 py-1 rounded-full w-fit uppercase tracking-wider">
              <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse"></span>
              Active Now
            </div>
          </div>
          <div className="bg-gradient-to-br from-indigo-200 to-indigo-400 p-4 rounded-2xl shadow-lg shadow-indigo-900/40 group-hover:shadow-indigo-500/20 transition-all duration-500">
            <UserPlus className="text-white w-6 h-6" />
          </div>
        </div>
      </div>

      {/* --- MAIN SECTION --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">

        {/* CHART ACTIVITY */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">
              Analytics <span className="text-slate-400 font-normal">Overview</span>
            </h3>
            <div className="flex gap-2">
              <span className="w-3 h-3 bg-slate-700 rounded-full"></span>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Daily Traffic</span>
            </div>
          </div>
          <div className="h-[350px]">
            <UsersChart usersData={dailyStats} />
          </div>
        </div>

       {/* NEW MEMBERS LIST - Modern Clean Style */}
<div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col h-full">
  
  {/* Header me stil minimalist */}
  <div className="flex items-center justify-between mb-8 px-2">
    <div>
      <h3 className="text-[17px] font-extrabold text-slate-900 tracking-tight">
        Recent Activity
      </h3>
      <div className="flex items-center gap-2 mt-1">
        <span className="flex h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">
          New members joined
        </p>
      </div>
    </div>
    <button className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-xl hover:bg-indigo-600 hover:text-white transition-all duration-300">
      SEE ALL
    </button>
  </div>

  {/* Lista e përdoruesve */}
  <div className="space-y-1 flex-1">
    {latestUsers.map((u) => (
      <div
        key={u.id}
        className="flex items-center justify-between p-3 rounded-[1.5rem] hover:bg-slate-50/80 transition-all duration-300 group"
      >
        <div className="flex items-center gap-4">
          {/* Avatar me rreth të hollë dhe shkronjë të qartë */}
          <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center font-bold text-slate-700 group-hover:scale-105 group-hover:border-indigo-200 group-hover:bg-white transition-all duration-300 shadow-sm text-base">
            {u.first_name[0].toUpperCase()}
          </div>

          <div className="min-w-0">
            <p className="text-[14px] font-bold text-slate-900 truncate">
              {u.first_name} {u.last_name}
            </p>
            <p className="text-[11px] text-slate-400 font-medium truncate">
              {u.email}
            </p>
          </div>
        </div>

        {/* Butoni i opsioneve - shfaqet vetëm në hover në mënyrë elegante */}
        <div className="flex items-center">
             <button className="p-2 text-slate-300 hover:text-slate-600 hover:bg-white rounded-xl transition-all duration-300">
                <EllipsisVertical className="w-5 h-5" />
             </button>
        </div>
      </div>
    ))}

    {/* State kur s'ka data */}
    {latestUsers.length === 0 && (
      <div className="flex flex-col items-center justify-center py-16 text-slate-300 italic text-sm">
        No recent activity
      </div>
    )}
  </div>

  {/* Bottom Info */}
  <div className="mt-6 px-4 py-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight text-center w-full">
      Updating in real-time
    </span>
  </div>
</div>
      </div>

      {/* GROWTH CHART FULL WIDTH */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">Growth <span className="text-indigo-300">Trajectory</span></h3>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">Monthly registration analytics</p>
        </div>
        <div className="h-[300px]">
          <UserGrowthChart usersData={monthlyStats} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;