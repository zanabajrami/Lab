import React, { useEffect, useState, useMemo } from "react";
import UserGrowthChart from "../../components/charts/UserGrowthChart";
import UsersChart from "../../components/charts/UsersChart";
import { Users, DollarSign, UserPlus, EllipsisVertical } from "lucide-react";

function Dashboard() {
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([]); // Lista e plotë
  const [dailyStats, setDailyStats] = useState([]);
  const [summary, setSummary] = useState(null);
  const [monthlyStats, setMonthlyStats] = useState([]);

  useEffect(() => {
    // 1. Fetch të gjithë përdoruesit për të nxjerrë "Latest Members"
    fetch("http://127.0.0.1:8000/api/users", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(console.error);

    // 2. Fetch stats tjera
    fetch("http://127.0.0.1:8000/api/users/stats/daily", { headers: { Authorization: `Bearer ${token}` } }).then(res => res.json()).then(setDailyStats);
    fetch("http://127.0.0.1:8000/api/users/stats/active", { headers: { Authorization: `Bearer ${token}` } }).then(res => res.json()).then(setSummary);
    fetch("http://127.0.0.1:8000/api/users/stats/monthly", { headers: { Authorization: `Bearer ${token}` } }).then(res => res.json()).then(setMonthlyStats);
  }, [token]);

  // Nxjerrim 5 më të fundit
  const latestUsers = useMemo(() => {
    return [...users]
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 5);
  }, [users]);

  return (
    <div className="p-6 bg-slate-50 min-h-screen rounded-2xl">
      {/* --- STATS CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* TOTAL USERS */}
        <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex justify-between items-center group hover:border-blue-200 transition-all">
          <div>
            <h2 className="text-slate-400 text-xs font-black uppercase tracking-widest">Total Users</h2>
            <p className="text-4xl font-black text-slate-900 mt-1 tracking-tight">
              {summary?.total_users ?? 0}
            </p>
            <div className="flex items-center gap-1 mt-2 text-emerald-500 font-bold text-sm">
              <span>▲ 12%</span>
              <span className="text-slate-400 font-medium text-xs tracking-normal">this month</span>
            </div>
          </div>
          <div className="bg-slate-900 p-4 rounded-2xl group-hover:bg-blue-600 transition-colors shadow-lg shadow-slate-200">
            <Users className="text-white w-6 h-6" />
          </div>
        </div>

        {/* REVENUE */}
        <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex justify-between items-center group hover:border-emerald-200 transition-all">
          <div>
            <h2 className="text-slate-400 text-xs font-black uppercase tracking-widest">Revenue</h2>
            <p className="text-4xl font-black text-slate-900 mt-1 tracking-tight">$0</p>
            <span className="text-slate-400 font-medium text-xs mt-2 block italic">No data yet</span>
          </div>
          <div className="bg-slate-100 p-4 rounded-2xl group-hover:bg-emerald-500 transition-all shadow-inner">
            <DollarSign className="text-slate-400 group-hover:text-white w-6 h-6" />
          </div>
        </div>

        {/* NEW USERS TODAY */}
        <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex justify-between items-center group hover:border-purple-200 transition-all">
          <div>
            <h2 className="text-slate-400 text-xs font-black uppercase tracking-widest">New Today</h2>
            <p className="text-4xl font-black text-slate-900 mt-1 tracking-tight">
              {summary?.today ?? 0}
            </p>
            <div className="bg-purple-50 text-purple-600 text-[10px] font-black px-2 py-0.5 rounded-md mt-2 inline-block">
              + New User
            </div>
          </div>
          <div className="bg-slate-900 p-4 rounded-2xl group-hover:bg-purple-600 transition-colors shadow-lg shadow-slate-200">
            <UserPlus className="text-white w-6 h-6" />
          </div>
        </div>
      </div>

      {/* --- MAIN SECTION: CHART & NEW MEMBERS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* CHART SEKSIONI */}
        <div className="lg:col-span-2 bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm">
          <h3 className="text-xl font-black text-slate-900 mb-6 px-2">User Activity</h3>
          <UsersChart usersData={dailyStats} />
        </div>

        {/* NEW MEMBERS LIST (E marrë nga lista Users) */}
        <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6 px-1">
            <div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight">New <span className="text-blue-600">Members</span></h3>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-0.5">Latest signups</p>
            </div>
          </div>

          <div className="space-y-2 flex-1">
            {latestUsers.map((u) => (
              <div key={u.id} className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-all duration-300 group">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-slate-900 flex items-center justify-center font-black text-white group-hover:bg-blue-600 transition-all duration-300 shadow-md">
                    <span className="text-sm">{u.first_name[0].toUpperCase()}</span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-[14px] font-black text-slate-900 group-hover:text-blue-600 transition-colors truncate max-w-[90px]">
                        {u.first_name} {u.last_name}
                      </p>
                    </div>
                    <p className="text-[11px] text-slate-400 font-bold truncate max-w-[120px]">{u.email}</p>
                  </div>
                </div>
                <button className="p-2 text-slate-300 hover:text-slate-900">
                  <EllipsisVertical className="w-5 h-5" />
                </button>
              </div>
            ))}

            {latestUsers.length === 0 && (
              <p className="text-center text-slate-400 text-xs font-bold py-10">No new members yet</p>
            )}
          </div>
          
          <button className="mt-6 w-full py-3.5 bg-slate-50 hover:bg-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-all duration-300">
            View All Members
          </button>
        </div>

      </div>

      {/* GROWTH CHART */}
      <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm">
         <UserGrowthChart usersData={monthlyStats} />
      </div>
    </div>
  );
}

export default Dashboard;