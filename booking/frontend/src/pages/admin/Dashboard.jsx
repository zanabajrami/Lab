import React, { useEffect, useState, useMemo } from "react";
import UserGrowthChart from "../../components/charts/UserGrowthChart";
import UsersChart from "../../components/charts/UsersChart";
import { Users, DollarSign, UserPlus, EllipsisVertical, ArrowUpRight} from "lucide-react";

function Dashboard() {
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([]);
  const [dailyStats, setDailyStats] = useState([]);
  const [summary, setSummary] = useState(null);
  const [monthlyStats, setMonthlyStats] = useState([]);

  // State për Editimin
  const [editingUser, setEditingUser] = useState(null);

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

  const handleUpdate = () => {
    fetch(`http://127.0.0.1:8000/api/users/${editingUser.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editingUser),
    })
      .then((res) => res.json())
      .then((updated) => {
        setUsers(users.map((u) => (u.id === updated.id ? updated : u)));
        setEditingUser(null);
      })
      .catch(console.error);
  };

  const latestUsers = useMemo(() => {
    return [...users]
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 5);
  }, [users]);

  return (
    <div className="p-4 sm:p-8 bg-[#f8fafc] min-h-screen text-slate-900 rounded-2xl relative">

      {/* MODAL EDITING - RESPONSIVE */}
      {editingUser && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all">
          <div className="bg-white rounded-[2.5rem] p-8 w-full max-w-md shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-300">

            {/* Header */}
            <div className="mb-8">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Edit Profile
              </h2>
              <p className="text-slate-500 text-sm mt-1 font-medium">
                Update user information and permissions.
              </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 tracking-widest">First Name</label>
                  <input
                    className="w-full p-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 transition-all outline-none text-slate-900 font-medium placeholder:text-slate-300"
                    value={editingUser.first_name}
                    onChange={(e) => setEditingUser({ ...editingUser, first_name: e.target.value })}
                    placeholder="e.g. John"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 tracking-widest">Last Name</label>
                  <input
                    className="w-full p-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 transition-all outline-none text-slate-900 font-medium placeholder:text-slate-300"
                    value={editingUser.last_name}
                    onChange={(e) => setEditingUser({ ...editingUser, last_name: e.target.value })}
                    placeholder="e.g. Doe"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 tracking-widest">Email Address</label>
                <input
                  className="w-full p-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 transition-all outline-none text-slate-900 font-medium placeholder:text-slate-300"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 tracking-widest">Access Role</label>
                <div className="relative">
                  <select
                    className="w-full p-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 transition-all outline-none text-slate-900 font-bold appearance-none cursor-pointer"
                    value={editingUser.role}
                    onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                  >
                    <option value="user">Standard User</option>
                    <option value="admin">Administrator</option>
                  </select>
                  {/* Custom Arrow for select */}
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 mt-10">
              <button
                onClick={() => setEditingUser(null)}
                className="flex-1 py-4 rounded-[1.2rem] bg-slate-50 text-slate-500 font-bold hover:bg-slate-100 hover:text-slate-700 transition-all active:scale-95"
              >
                Discard
              </button>
              <button
                onClick={handleUpdate}
                className="flex-1 py-4 rounded-[1.2rem] bg-slate-950 text-white font-bold shadow-xl shadow-slate-200 hover:bg-indigo-950 hover:shadow-indigo-200 transition-all active:scale-95"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- STATS CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* TOTAL USERS */}
        <div className="bg-slate-950 p-6 rounded-[2.5rem] border border-white/5 shadow-2xl flex justify-between items-center group hover:bg-slate-900 transition-all duration-500">
          <div>
            <h2 className="text-indigo-300/50 text-[11px] font-bold uppercase tracking-[0.2em]">Total Users</h2>
            <p className="text-4xl font-black text-white mt-2 tracking-tighter">{summary?.total_users ?? 0}</p>
            <div className="flex items-center gap-1.5 mt-4 text-indigo-200 font-bold text-[10px] bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full w-fit uppercase tracking-wider">
              <ArrowUpRight className="w-3 h-3 text-indigo-400" /> 12% Growth
            </div>
          </div>
          <div className="bg-indigo-950 p-4 rounded-2xl shadow-lg shadow-indigo-500/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
            <Users className="text-white w-6 h-6" />
          </div>
        </div>

        {/* REVENUE */}
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

        {/* LIVE TODAY */}
        <div className="bg-slate-950 p-6 rounded-[2.5rem] border border-white/5 shadow-2xl flex justify-between items-center group hover:bg-slate-900 transition-all duration-500">
          <div>
            <h2 className="text-indigo-300/50 text-[11px] font-bold uppercase tracking-[0.2em]">New Users</h2>
            <p className="text-4xl font-black text-white mt-2 tracking-tighter">{summary?.today ?? 0}</p>
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
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Analytics <span className="text-slate-400 font-normal">Overview</span></h3>
            <div className="flex gap-2 items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <span className="w-2 h-2 bg-slate-700 rounded-full"></span> Daily Traffic
            </div>
          </div>
          <div className="h-[350px]">
            <UsersChart usersData={dailyStats} />
          </div>
        </div>

        {/* RECENT ACTIVITY LIST */}
        <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col h-full">
          <div className="flex items-center justify-between mb-8 px-2">
            <div>
              <h3 className="text-[17px] font-extrabold text-slate-900 tracking-tight">Recent Activity</h3>
              <div className="flex items-center gap-2 mt-1 font-bold uppercase tracking-wider text-[10px] text-slate-400">
                <span className="flex h-1.5 w-1.5 rounded-full bg-indigo-900"></span> New members joined
              </div>
            </div>
          </div>

          <div className="space-y-1 flex-1">
            {latestUsers.map((u) => (
              <div key={u.id} className="flex items-center justify-between p-3 rounded-[1.5rem] hover:bg-slate-50 transition-all duration-300 group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center font-bold text-slate-700 group-hover:scale-105 group-hover:border-indigo-200 group-hover:bg-white transition-all shadow-sm">
                    {u.first_name[0].toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[14px] font-bold text-slate-900 truncate">{u.first_name} {u.last_name}</p>
                    <p className="text-[11px] text-slate-400 font-medium truncate">{u.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => setEditingUser(u)}
                  className="p-2 text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                >
                  <EllipsisVertical className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 px-4 py-3 bg-slate-50 rounded-2xl border border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-tight text-center">
            Updating in real-time
          </div>
        </div>
      </div>

      {/* GROWTH CHART */}
      <div className="mt-8 transition-all duration-500 hover:translate-y-[-4px]">
        <UserGrowthChart usersData={monthlyStats} />
      </div>
    </div>
  );
}

export default Dashboard;