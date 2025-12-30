import { useState, useEffect } from "react";
import { User, MessageSquare } from "lucide-react";

function Topbar() {
  const [user, setUser] = useState(null);
  const [unreadCount, setUnreadCount] = useState(3);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Gabim gjatë leximit të përdoruesit:", error);
      }
    }
  }, []);

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-1 h-8 bg-indigo-900 rounded-full hidden sm:block"></div>

        <div className="flex flex-col">
          <h1 className="text-xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-900 to-indigo-200">
              ADMIN
            </span>
            <span className="text-slate-400 font-light">|</span>
            <span className="text-[15px] uppercase tracking-[0.2em] font-medium text-slate-500 py-1">
              Dashboard
            </span>
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-gray-500 hover:text-indigo-800 hover:bg-indigo-50 rounded-full transition-all group">
          <MessageSquare size={22} />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-900 text-[10px] font-bold text-white border-2 border-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
          <span className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-gray-700 text-white text-xs px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out whitespace-nowrap z-20 shadow-lg">
            Messages
          </span>
        </button>

        <div className="h-8 w-[1px] bg-gray-200" />

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-gray-900 leading-none">
              {user?.name || "Admin User"}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {user?.email || "Nuk ka email"}
            </p>
          </div>

          {/* Avatar Placeholder */}
          <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-900 border border-indigo-200">
            <User size={20} />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;