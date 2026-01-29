import React from "react";
import { LayoutDashboard, Users, ShieldUser, Settings, LogOut, UserLock, ChevronRight, CalendarCheck } from "lucide-react";

function Sidebar({ activePage, setActivePage }) {

  const navItemClass = (page) => `
    w-full flex items-center group relative
    px-0 lg:px-4 py-3 rounded-xl transition-all duration-200
    justify-center lg:justify-start
    ${activePage === page
      ? "bg-indigo-50 text-gray-700"
      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}
  `;

  return (
    <aside
      className="relative flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ease-in-out
               h-screen z-40 w-16 lg:w-64"
    >
      {/* Logo Section */}
      <div className="h-24 flex items-center px-2 lg:px-4 mb-4">
        <div className="flex items-center gap-3 bg-slate-800 p-3 rounded-2xl border border-slate-100 w-full shadow-sm justify-center lg:justify-start">

          <div className="flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-xl shrink-0">
            <ShieldUser className="w-6 h-6 lg:w-7 lg:h-7 text-indigo-300" />
          </div>

          {/* HIDE TEXT ON MOBILE & IPAD (only show on LG) */}
          <div className="hidden lg:flex flex-col">
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
      <nav className="flex-1 px-2 lg:px-4 space-y-1.5">
        <p className="hidden lg:block text-[11px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-3">
          Main Menu
        </p>

        <button onClick={() => setActivePage("dashboard")} className={navItemClass("dashboard")}>
          <LayoutDashboard size={20} strokeWidth={activePage === "dashboard" ? 2.5 : 2} />
          <span className="hidden lg:inline ml-3 font-semibold text-[15px]">Dashboard</span>
          
          {activePage === "dashboard" && (
            <div className="hidden lg:block absolute left-0 w-1 h-6 bg-indigo-900 rounded-r-full" />
          )}

          <ChevronRight
            size={14}
            className={`hidden lg:block ml-auto opacity-0 group-hover:opacity-100 transition-opacity
              ${activePage === "dashboard" ? "opacity-100" : ""}`}
          />
        </button>

        <button onClick={() => setActivePage("users")} className={navItemClass("users")}>
          <Users size={20} strokeWidth={activePage === "users" ? 2.5 : 2} />
          <span className="hidden lg:inline ml-3 font-semibold text-[15px]">Users</span>
          
          {activePage === "users" && (
            <div className="hidden lg:block absolute left-0 w-1 h-6 bg-indigo-900 rounded-r-full" />
          )}

          <ChevronRight
            size={14}
            className={`hidden lg:block ml-auto opacity-0 group-hover:opacity-100 transition-opacity
              ${activePage === "users" ? "opacity-100" : ""}`}
          />
        </button>

        <button onClick={() => setActivePage("last-login")} className={navItemClass("last-login")}>
          <UserLock size={20} strokeWidth={activePage === "last-login" ? 2.5 : 2} />
          <span className="hidden lg:inline ml-3 font-semibold text-[15px]">Login Activity</span>
          
          {activePage === "last-login" && (
            <div className="hidden lg:block absolute left-0 w-1 h-6 bg-indigo-900 rounded-r-full" />
          )}

          <ChevronRight
            size={14}
            className={`hidden lg:block ml-auto opacity-0 group-hover:opacity-100 transition-opacity
              ${activePage === "last-login" ? "opacity-100" : ""}`}
          />
        </button>

        <button onClick={() => setActivePage("bookings")} className={navItemClass("bookings")}>
          <CalendarCheck size={20} strokeWidth={activePage === "bookings" ? 2.5 : 2} />
          <span className="hidden lg:inline ml-3 font-semibold text-[15px]">Bookings</span>
          
          {activePage === "bookings" && (
            <div className="hidden lg:block absolute left-0 w-1 h-6 bg-indigo-900 rounded-r-full" />
          )}

          <ChevronRight
            size={14}
            className={`hidden lg:block ml-auto opacity-0 group-hover:opacity-100 transition-opacity
              ${activePage === "bookings" ? "opacity-100" : ""}`}
          />
        </button>

        <div className="pt-6">
          <p className="hidden lg:block text-[11px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-3">
            System
          </p>
          <button onClick={() => setActivePage("settings")} className={navItemClass("settings")}>
            <Settings size={20} strokeWidth={activePage === "settings" ? 2.5 : 2} />
            <span className="hidden lg:inline ml-3 font-semibold text-[15px]">Settings</span>
            {activePage === "settings" && (
              <div className="hidden lg:block absolute left-0 w-1 h-6 bg-indigo-900 rounded-r-full" />
            )}
          </button>
        </div>
      </nav>

      {/* Logout Section */}
      <div className="p-4 mt-auto">
        <button className="w-full flex items-center justify-center lg:justify-start px-4 py-3
                   text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 group">
          <LogOut size={20} />
          <span className="hidden lg:inline ml-3 font-semibold text-[15px]">Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;