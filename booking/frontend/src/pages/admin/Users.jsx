import React, { useEffect, useMemo, useState, useRef } from "react";
import { Plus, Trash2, Pencil, Search, Users as UsersIcon, ChevronLeft, ChevronRight, Mail, Shield } from "lucide-react";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(window.innerWidth < 768 ? 5 : 8);
  const token = localStorage.getItem("token");
  const headerRef = useRef(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, [token]);

  const filtered = useMemo(() => {
    return users.filter((u) =>
      `${u.first_name} ${u.last_name} ${u.email}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [users, search]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    const res = await fetch(`http://127.0.0.1:8000/api/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] p-4 md:p-10 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <UsersIcon className="w-8 h-8 text-indigo-600" />
              <h1 className="text-3xl font-black tracking-tight text-slate-900">All Users</h1>
            </div>
            <p className="text-slate-500 font-medium">You have {users.length} total members in your database.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Find someone..."
                className="pl-10 pr-4 py-2.5 bg-white border-none shadow-sm rounded-2xl w-full md:w-64 focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none"
              />
            </div>
            <button className="p-2.5 bg-slate-900 text-white rounded-2xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200">
              <Plus className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Minimalist Table */}
        <div className="bg-white/70 backdrop-blur-md rounded-[2rem] shadow-sm border border-white overflow-hidden">
          <div className="hidden md:block">
            <table className="w-full border-separate border-spacing-0">
              <thead>
                <tr>
                  <th className="px-8 py-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Member</th>
                  <th className="px-8 py-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Role</th>
                  <th className="px-8 py-6 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((u) => (
                  <tr key={u.id} className="group hover:bg-white transition-all">
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center font-bold text-slate-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                          {u.first_name[0]}
                        </div>
                        <div>
                          <div className="font-bold text-slate-800">{u.first_name} {u.last_name}</div>
                          <div className="text-sm text-slate-400 font-medium">{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-4">
                      <div className={`inline-flex px-3 py-1 rounded-xl text-xs font-bold tracking-tight ${u.role === 'admin' ? 'bg-orange-100 text-orange-600' : 'bg-slate-100 text-slate-600'}`}>
                        {u.role}
                      </div>
                    </td>
                    <td className="px-8 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-all">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(u.id)}
                          className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile List */}
          <div className="md:hidden">
            {paginated.map((u) => (
              <div key={u.id} className="p-6 border-b border-slate-50 last:border-none">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-lg">
                    {u.first_name[0]}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-slate-900">{u.first_name} {u.last_name}</div>
                    <div className="text-xs text-slate-400 truncate max-w-[180px]">{u.email}</div>
                  </div>
                  <div className="text-[10px] font-black uppercase text-slate-300">#{u.id}</div>
                </div>
                <div className="flex items-center justify-between bg-slate-50 p-3 rounded-2xl">
                  <span className="text-xs font-bold text-slate-500 uppercase">{u.role}</span>
                  <div className="flex gap-2">
                    <Pencil className="w-4 h-4 text-slate-400" />
                    <Trash2 onClick={() => handleDelete(u.id)} className="w-4 h-4 text-red-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Minimal Pagination */}
        <div className="mt-8 flex items-center justify-between px-2">
          <div className="text-sm font-bold text-slate-400">
            {page} <span className="mx-1 text-slate-200">/</span> {totalPages}
          </div>
          <div className="flex gap-3">
            <button
              disabled={page === 1}
              onClick={() => { setPage(p => p - 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="flex items-center gap-2 px-5 py-2 rounded-2xl bg-white border border-transparent shadow-sm hover:border-slate-200 disabled:opacity-30 transition-all font-bold text-slate-600 text-sm"
            >
              <ChevronLeft className="w-4 h-4" /> Prev
            </button>
            <button
              disabled={page === totalPages}
              onClick={() => { setPage(p => p + 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="flex items-center gap-2 px-5 py-2 rounded-2xl bg-white border border-transparent shadow-sm hover:border-slate-200 disabled:opacity-30 transition-all font-bold text-slate-600 text-sm"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}