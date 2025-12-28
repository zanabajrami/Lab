import React from "react";
import { LayoutDashboard, Users, ShieldUser, Settings, LogOut } from "lucide-react";
import { UserLock } from "lucide-react";

function Sidebar({ activePage, setActivePage }) {
  const navItemClass = (page) => `
    w-full flex items-center justify-center md:justify-start px-3 py-3 rounded-lg transition-all duration-200 group
    ${activePage === page
      ? "bg-indigo-100 text-gray-900 shadow-md shadow-indigo-200"
      : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"}
  `;

  return (
    <aside
      className="relative flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ease-in-out h-screen z-40 w-64"
    >
      {/* Logo Section */}
      <div className="p-4 md:p-6 mb-4 flex items-center justify-center md:justify-start gap-3">
        <div className="p-2 rounded-lg shrink-0 flex items-center justify-center">
          <ShieldUser className="w-7 h-7 text-gray-800" />
        </div>
        <span className="hidden md:block text-xl font-bold tracking-tight text-gray-800 animate-fadeIn">
          BookInn <span className="text-gray-700">Admin</span>
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 space-y-2">
        <button onClick={() => setActivePage("dashboard")} className={navItemClass("dashboard")}>
          <LayoutDashboard size={22} />
          <span className="ml-3 font-medium hidden md:block">Dashboard</span>
        </button>

        <button onClick={() => setActivePage("users")} className={navItemClass("users")}>
          <Users size={22} />
          <span className="ml-3 font-medium hidden md:block">Users</span>
        </button>

        <button
          onClick={() => setActivePage("last-login")}
          className={navItemClass("last-login")}
        >
          <UserLock size={22} />
          <span className="ml-3 font-medium hidden md:block">Login Activity</span>
        </button>

        <div className="my-4 border-t border-gray-100" />

        <button className="w-full flex items-center justify-center md:justify-start px-3 py-3 text-gray-500 hover:bg-gray-100 rounded-lg transition-all group">
          <Settings size={22} />
          <span className="ml-3 font-medium hidden md:block">Settings</span>
        </button>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-100">
        <button className="w-full flex items-center justify-center md:justify-start px-3 py-3 text-red-500 hover:bg-red-50 rounded-lg transition-all group">
          <LogOut size={22} />
          <span className="ml-3 font-medium hidden md:block">Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
