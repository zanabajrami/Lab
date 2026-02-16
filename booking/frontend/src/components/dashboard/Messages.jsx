import { useState } from "react";
import { MailOpen, CheckCheck } from "lucide-react";

export default function Messages({ messages, onReply }) {  
  const [replyText, setReplyText] = useState({});

  const handleReplyChange = (id, value) => {
    setReplyText(prev => ({ ...prev, [id]: value }));
  };

  const handleSendReply = (id) => {
    if (!replyText[id] || replyText[id].trim() === "") return;
    onReply(id, replyText[id]);  
    setReplyText(prev => ({ ...prev, [id]: "" }));
  };

  return (
    <div className="max-h-[350px] overflow-y-auto">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center py-12 text-gray-400">
          <MailOpen size={40} className="mb-2 opacity-20" />
          <p className="text-sm italic">No messages</p>
        </div>
      ) : (
        messages.map((msg) => (
          <div
            key={msg.id}
            className={`px-5 py-4 border-b cursor-pointer transition-all
              hover:bg-indigo-50 relative
              ${Number(msg.is_read) === 0 ? "bg-indigo-50 border-l-4 border-red-900" : "bg-white opacity-60"}`}
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-1">
              <p className={`text-[14px] flex items-center gap-2 ${Number(msg.is_read) === 0 ? "font-extrabold text-gray-900" : "font-medium text-gray-500"}`}>
                {msg.name}
                {Number(msg.is_read) === 0 && (
                  <span className="text-[9px] bg-red-600 text-white px-2 py-0.5 rounded-full font-bold uppercase">
                    NEW
                  </span>
                )}
              </p>
              <div className="flex items-center gap-1 text-[10px] text-gray-500">
                {new Date(msg.created_at).toLocaleTimeString()}
              </div>
            </div>

            {/* Message */}
            <p className={`text-xs line-clamp-2 ${Number(msg.is_read) === 0 ? "text-gray-800 font-semibold" : "text-gray-400"}`}>
              {msg.message}
            </p>

            {/* Admin Reply */}
            {msg.reply && (
              <div className="mt-2 p-2 bg-gray-100 rounded-xl border-l-4 border-indigo-600">
                <p className="text-gray-800 font-semibold">Admin: {msg.reply}</p>
              </div>
            )}

            {/* Reply input */}
            <div className="mt-2 flex gap-2">
              <input
                type="text"
                placeholder="Write a reply..."
                value={replyText[msg.id] || ""}
                onChange={(e) => handleReplyChange(msg.id, e.target.value)}
                className="flex-1 px-3 py-2 rounded-2xl border border-gray-700 bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={() => handleSendReply(msg.id)}
                className="px-3 py-2 bg-slate-900 text-white rounded-2xl hover:bg-indigo-300 hover:text-slate-900 transition-all font-bold"
              >
                Reply
              </button>
            </div>

            {/* Footer */}
            <div className="flex justify-end mt-2">
              {Number(msg.is_read) === 0 ? (
                <span className="text-[10px] text-red-600 font-bold flex items-center gap-1">
                  <MailOpen size={12} /> Unread
                </span>
              ) : (
                <CheckCheck size={14} className="text-green-500" />
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
