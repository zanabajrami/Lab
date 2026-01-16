import { useState, useEffect, useRef } from "react";
import {
  User,
  MessageSquare,
  Clock,
  MailOpen,
  CheckCheck,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

function Topbar() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  /* =============================
     UNREAD LOGIC
  ============================= */
  const unreadMessages = messages.filter(
    (msg) => Number(msg.is_read) === 0
  );
  const hasUnread = unreadMessages.length > 0;

  /* =============================
     LOAD USER
  ============================= */
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("User parse error:", e);
      }
    }
  }, []);

  /* =============================
     CLICK OUTSIDE DROPDOWN
  ============================= */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* =============================
     FETCH MESSAGES
  ============================= */
  const fetchMessages = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/messages");
      const data = await res.json();
      if (data.status === "success") {
        setMessages(data.data);
      }
    } catch (err) {
      console.error("Fetch messages error:", err);
    }
  };

  /* =============================
     INITIAL + AUTO REFRESH
  ============================= */
  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 10000); // 10s
    return () => clearInterval(interval);
  }, []);

  /* =============================
     MARK AS READ
  ============================= */
  const markAsRead = async (id, status) => {
    if (Number(status) === 1) return;

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/messages/${id}/read`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === id ? { ...m, is_read: 1 } : m
          )
        );
      }
    } catch (err) {
      console.error("Mark read error:", err);
    }
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-8 shadow-sm">
      {/* LEFT */}
      <div className="flex items-center gap-2">
        <div className="w-1 h-8 bg-indigo-900 rounded-full hidden sm:block" />
        <h1 className="flex items-center gap-2 font-extrabold tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-900 to-indigo-600 text-lg sm:text-xl font-black">
            ADMIN
          </span>
          <span className="hidden sm:inline text-slate-300 font-light">
            |
          </span>
          <span className="hidden sm:inline text-[13px] uppercase tracking-[0.2em] font-semibold text-slate-500">
            Dashboard
          </span>
        </h1>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3 sm:gap-6 mt-1 mb-1">
        {/* MESSAGES */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => {
              setDropdownOpen(!dropdownOpen);
              if (!dropdownOpen) fetchMessages();
            }}
            className={`relative p-2.5 rounded-full transition-all duration-200
              ${dropdownOpen
                ? "bg-gray-100 text-slate-900"
                : "text-gray-500 hover:bg-gray-100"
              }
              ${hasUnread
                ? "animate-pulse ring-1 ring-red-400 ring-offset-0.5"
                : ""
              }
            `}
          >
            <MessageSquare size={22} />

            {hasUnread && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-600 border-2 border-white rounded-full animate-ping" />
            )}
          </button>

          {/* DROPDOWN */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white border border-gray-200 shadow-2xl rounded-2xl z-50 overflow-hidden">
              {/* HEADER */}
              <div className="px-5 py-4 border-b flex justify-between items-center">
                <h4 className="font-bold text-gray-800">
                  Messages
                </h4>
                {hasUnread && (
                  <div className="flex items-center gap-1 bg-slate-50/50 px-3 py-1 rounded-xl border border-indigo-100/50">
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.12em]">
                      Unread
                    </span>
                    <span className="bg-white text-red-600 text-[11px] font-black px-2 py-0.5 rounded-lg shadow-sm border border-indigo-100">
                      {unreadMessages.length}
                    </span>
                  </div>
                )}
              </div>

              {/* LIST */}
              <div className="max-h-[350px] overflow-y-auto">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center py-12 text-gray-400">
                    <MailOpen size={40} className="mb-2 opacity-20" />
                    <p className="text-sm italic">
                      No messages
                    </p>
                  </div>
                ) : (
                  messages.map((msg) => (
                    <div
                      key={msg.id}
                      onClick={() =>
                        markAsRead(msg.id, msg.is_read)
                      }
                      className={`px-5 py-4 border-b cursor-pointer transition-all
                        hover:bg-indigo-50 relative
                        ${Number(msg.is_read) === 0
                          ? "bg-indigo-50 border-l-4 border-red-900"
                          : "bg-white opacity-60"
                        }
                      `}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <p
                          className={`text-[14px] capitalize flex items-center gap-2
                            ${Number(msg.is_read) === 0
                              ? "font-extrabold text-gray-900"
                              : "font-medium text-gray-500"
                            }
                          `}
                        >
                          {msg.name}
                          {Number(msg.is_read) === 0 && (
                            <span className="text-[9px] bg-red-600 text-white px-2 py-0.5 rounded-full font-bold uppercase">
                              NEW
                            </span>
                          )}
                        </p>

                        <div className="flex items-center gap-1 text-[10px] text-gray-400">
                          <Clock size={10} />
                          {formatDistanceToNow(
                            new Date(msg.created_at),
                            { addSuffix: true }
                          )}
                        </div>
                      </div>

                      <p
                        className={`text-xs line-clamp-2
                          ${Number(msg.is_read) === 0
                            ? "text-gray-800 font-semibold"
                            : "text-gray-400"
                          }
                        `}
                      >
                        {msg.message}
                      </p>

                      <div className="flex justify-end mt-2">
                        {Number(msg.is_read) === 0 ? (
                          <span className="text-[10px] text-red-600 font-bold flex items-center gap-1">
                            <MailOpen size={12} /> Unread
                          </span>
                        ) : (
                          <CheckCheck
                            size={14}
                            className="text-green-500"
                          />
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div className="hidden sm:block h-8 w-[1px] bg-gray-200" />

        {/* USER */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-bold">
              {user?.name || "Administrator"}
            </p>
            <p className="text-[11px] text-gray-500 italic">
              {user?.email || "admin@system.com"}
            </p>
          </div>
          <div className="h-10 w-10 rounded-xl bg-indigo-900 flex items-center justify-center text-white shadow-lg">
            <User size={20} />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;
