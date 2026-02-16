import { useState, useEffect, useRef } from "react";
import { User, MessageSquare } from "lucide-react";
import Messages from "./Messages";

export default function Topbar() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const unreadMessages = messages.filter(msg => Number(msg.is_read) === 0);
  const hasUnread = unreadMessages.length > 0;

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://127.0.0.1:8000/api/admin/messages", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      const data = await res.json();
      if (data.status === "success") setMessages(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleReply = async (id, reply) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://127.0.0.1:8000/api/messages/${id}/reply`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ reply }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Error reply:", res.status, text);
        return;
      }

      const data = await res.json();
      // Përditëso mesazhet + set is_read = 1
      setMessages(prev => prev.map(m => m.id === id ? { ...m, reply: data.data.reply, is_read: 1 } : m));
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://127.0.0.1:8000/api/messages/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      if (!res.ok) throw new Error("Failed to delete message");

      // Hiq mesazhin nga lista
      setMessages(prev => prev.filter(m => m.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-8 shadow-sm">
      {/* LEFT */}
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="w-1 h-8 bg-indigo-900 rounded-full hidden sm:block" />
        <h1 className="flex items-center gap-2 font-extrabold tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-900 to-indigo-200 text-lg sm:text-xl">
            ADMIN
          </span>
        </h1>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3 sm:gap-6">
        {/* Messages dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => {
              setDropdownOpen(!dropdownOpen);
              if (!dropdownOpen) fetchMessages();
            }}
            className={`relative p-2.5 rounded-full transition-all duration-200 ${hasUnread ? "animate-pulse ring-1 ring-red-400 ring-offset-0.5" : "text-gray-500 hover:bg-gray-50"}`}
          >
            <MessageSquare size={22} />
            {hasUnread && <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-600 border-2 border-white rounded-full animate-ping" />}
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white border border-gray-200 shadow-2xl rounded-2xl z-50 overflow-hidden">
              <div className="px-5 py-4 border-b flex justify-between items-center font-bold text-gray-800">
                Messages
                {hasUnread && (
                  <div className="flex items-center gap-1 bg-slate-50/50 px-3 py-1 rounded-xl border border-indigo-100/50">
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.12em]">Unread</span>
                    <span className="bg-white text-red-600 text-[11px] font-black px-2 py-0.5 rounded-lg shadow-sm border border-indigo-100">{unreadMessages.length}</span>
                  </div>
                )}
              </div>
              <Messages messages={messages} onReply={handleReply} onDelete={handleDelete} />
            </div>
          )}
        </div>

        {/* User info */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-bold">{user?.name || "Administrator"}</p>
            <p className="text-[11px] text-gray-500 italic">{user?.email || "admin@system.com"}</p>
          </div>
          <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-700 shadow-lg">
            <User size={20} />
          </div>
        </div>
      </div>
    </header>
  );
}
