import React from "react";
import { LayoutDashboard, Users, ShieldUser, Settings, LogOut, UserLock, ChevronRight } from "lucide-react";

function Sidebar({ activePage, setActivePage }) {

  const navItemClass = (page) => `
    w-full flex items-center group relative px-4 py-3 rounded-xl transition-all duration-200
    ${activePage === page
      ? "bg-indigo-50 text-gray-700"
      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}
  `;

  return (
    <aside
      className="relative flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ease-in-out h-screen z-40 w-64"
    >
      {/* Logo Section */}
      <div className="h-24 flex items-center px-4 mb-4">
        <div className="flex items-center gap-3 bg-slate-800 p-3 rounded-2xl border border-slate-100 w-full shadow-sm">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl shrink-0">
            <ShieldUser className="w-7 h-7 text-indigo-300" />
          </div>

          <div className="flex flex-col">
            <h1 className="text-xl font-black tracking-tighter text-white uppercase leading-none">
              Book<span className="text-indigo-300 italic">Inn</span>
            </h1>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="h-[2px] w-4 bg-indigo-300 rounded-full"></span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                Back Office
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 space-y-1.5">
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-3">Main Menu</p>
        <button onClick={() => setActivePage("dashboard")} className={navItemClass("dashboard")}>
          <LayoutDashboard size={20} strokeWidth={activePage === "dashboard" ? 2.5 : 2} />
          <span className="ml-3 font-semibold text-[15px]">Dashboard</span>
          {activePage === "dashboard" && <div className="absolute left-0 w-1 h-6 bg-indigo-900 rounded-r-full" />}
          <ChevronRight size={14} className={`ml-auto opacity-0 group-hover:opacity-100 transition-opacity ${activePage === "dashboard" ? "opacity-100" : ""}`} />
        </button>

        <button onClick={() => setActivePage("users")} className={navItemClass("users")}>
          <Users size={20} strokeWidth={activePage === "users" ? 2.5 : 2} />
          <span className="ml-3 font-semibold text-[15px]">Users</span>
          {activePage === "users" && <div className="absolute left-0 w-1 h-6 bg-indigo-900 rounded-r-full" />}
          <ChevronRight size={14} className={`ml-auto opacity-0 group-hover:opacity-100 transition-opacity ${activePage === "users" ? "opacity-100" : ""}`} />
        </button>

        <button onClick={() => setActivePage("last-login")} className={navItemClass("last-login")}>
          <UserLock size={20} strokeWidth={activePage === "last-login" ? 2.5 : 2} />
          <span className="ml-3 font-semibold text-[15px]">Login Activity</span>
          {activePage === "last-login" && <div className="absolute left-0 w-1 h-6 bg-indigo-900 rounded-r-full" />}
          <ChevronRight size={14} className={`ml-auto opacity-0 group-hover:opacity-100 transition-opacity ${activePage === "last-login" ? "opacity-100" : ""}`} />
        </button>

        <div className="pt-6">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-3">System</p>
          <button onClick={() => setActivePage("settings")} className={navItemClass("settings")}>
            <Settings size={20} strokeWidth={activePage === "settings" ? 2.5 : 2} />
            <span className="ml-3 font-semibold text-[15px]">Settings</span>
            {activePage === "settings" && <div className="absolute left-0 w-1 h-6 bg-indigo-900 rounded-r-full" />}
          </button>
        </div>
      </nav>

      {/* Logout Section */}
      <div className="p-4 mt-auto">
        <button className="w-full flex items-center px-4 py-3 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 group">
          <div className="p-1.5 rounded-lg group-hover:bg-red-100 transition-colors">
            <LogOut size={20} />
          </div>
          <span className="ml-3 font-semibold text-[15px]">Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;