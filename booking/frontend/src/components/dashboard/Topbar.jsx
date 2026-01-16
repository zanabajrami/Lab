import { useState, useEffect, useRef } from "react";
import { User, MessageSquare } from "lucide-react";

function Topbar() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef();

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

  // Mbyll dropdown kur klikohen jashtë
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch mesazhet nga backend
  useEffect(() => {
    if (dropdownOpen) {
      fetch("http://127.0.0.1:8000/api/messages")
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            setMessages(data.data); // supozojmë që Laravel kthen {status, data}
          } else {
            console.error("Gabim në marrjen e mesazheve:", data);
          }
        })
        .catch((err) => console.error("Gabim fetch mesazheve:", err));
    }
  }, [dropdownOpen]);

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
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="relative p-2 text-gray-500 hover:text-indigo-800 hover:bg-indigo-50 rounded-full transition-all group"
          >
            <MessageSquare size={20} className="sm:size-[22px]" />
            {/* Hiq unreadCount */}
          </button>

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 shadow-lg rounded-lg z-50 overflow-hidden">
              <h4 className="px-4 py-2 border-b border-gray-100 font-semibold text-gray-700">
                Messages
              </h4>
              <div className="max-h-64 overflow-y-auto">
                {messages.length === 0 && (
                  <p className="px-4 py-2 text-gray-500">Nuk ka mesazhe</p>
                )}
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100 cursor-pointer"
                  >
                    <p className="font-semibold text-gray-800">{msg.name}</p>
                    <p className="text-sm text-gray-600 truncate">{msg.message}</p>
                  </div>
                ))}
              </div>
              <button className="w-full text-indigo-800 font-medium py-2 hover:bg-gray-100">
                View All Messages
              </button>
            </div>
          )}
        </div>

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
