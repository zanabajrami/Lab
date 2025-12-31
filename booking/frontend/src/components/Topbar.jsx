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
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-8 shadow-sm">
      
      {/* LEFT */}
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="w-1 h-8 bg-indigo-900 rounded-full hidden sm:block" />

        <h1 className="flex items-center gap-2 font-extrabold tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-900 to-indigo-200 text-lg sm:text-xl">
            ADMIN
          </span>

          <span className="hidden sm:inline text-slate-400 font-light">|</span>

          <span className="hidden sm:inline text-[15px] uppercase tracking-[0.2em] font-medium text-slate-500">
            Dashboard
          </span>
        </h1>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3 sm:gap-6">
        
        {/* Messages */}
        <button className="relative p-2 text-gray-500 hover:text-indigo-800 hover:bg-indigo-50 rounded-full transition-all group">
          <MessageSquare size={20} className="sm:size-[22px]" />

          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-indigo-900 text-[9px] sm:text-[10px] font-bold text-white border-2 border-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}

          {/* Tooltip vetëm desktop */}
          <span className="hidden sm:block absolute -bottom-12 left-1/2 -translate-x-1/2 bg-gray-700 text-white text-xs px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-20 shadow-lg">
            Messages
          </span>
        </button>

        {/* Divider vetëm desktop */}
        <div className="hidden sm:block h-8 w-[1px] bg-gray-200" />

        {/* User */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-semibold text-gray-900 leading-none">
              {user?.name || "Admin User"}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {user?.email || "Nuk ka email"}
            </p>
          </div>

          <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-900 border border-indigo-200">
            <User size={18} className="sm:size-[20px]" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;
