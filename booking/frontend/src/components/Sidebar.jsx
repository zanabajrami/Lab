import React from "react";

export default function Sidebar({ activePage, setActivePage }) {
  return (
    <aside className="w-64 bg-white border-r">
      <div className="p-6 text-2xl font-bold text-indigo-900">Admin Panel</div>
      <nav className="px-4 space-y-2">
        <button
          className="block w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100"
          onClick={() => setActivePage("dashboard")}
        >
          Dashboard
        </button>
        <button
          className="block w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100"
          onClick={() => setActivePage("users")}
        >
          Users
        </button>
      </nav>
    </aside>
  );
}
