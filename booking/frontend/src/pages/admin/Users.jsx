import React, { useEffect, useMemo, useState } from "react";
import { Plus, Trash2, Pencil, Search, ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { LiaUsersSolid } from "react-icons/lia";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const token = localStorage.getItem("token");
  const [perPage, setPerPage] = useState(window.innerWidth < 768 ? 5 : 6);
  const [editingUser, setEditingUser] = useState(null);
  const [addingUser, setAddingUser] = useState(false);
  const [newUser, setNewUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    role: "user",
  });

  // Reset page kur ndryshon search
  useEffect(() => {
    setPage(1);
  }, [search]);

  // Update perPage on resize
  useEffect(() => {
    const handleResize = () => setPerPage(window.innerWidth < 768 ? 5 : 6);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch users
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
      `${u.first_name} ${u.last_name} ${u.email}`.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    const res = await fetch(
      `http://127.0.0.1:8000/api/users/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.ok) {
      setUsers(prev => prev.filter(u => u.id !== id));
    }
  };

  const handleUpdate = async () => {
    const res = await fetch(
      `http://127.0.0.1:8000/api/users/${editingUser.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          first_name: editingUser.first_name,
          last_name: editingUser.last_name,
          email: editingUser.email,
          role: editingUser.role,
        }),
      }
    );

    const data = await res.json();

    if (res.ok) {
      setUsers(prev =>
        prev.map(u =>
          u.id === data.user.id ? data.user : u
        )
      );
      setEditingUser(null);
    }
  };

  const handleAddUser = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newUser),
      });

      const data = await res.json();

      if (res.ok) {
        setUsers(prev => [...prev, data.user]); // shto user në fund
        setAddingUser(false);
        setNewUser({ first_name: "", last_name: "", email: "", password: "", role: "user" }); // reset form
      } else {
        alert("Failed to add user: " + JSON.stringify(data));
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while adding user");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] text-slate-900 antialiased rounded-[2.5rem] p-4 sm:p-6 md:p-6 lg:p-8 xl:p-10">
      <div className="w-full max-w-full md:max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto">

        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 md:gap-6 mb-6 md:mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2 -mt-2 md:-mt-5">
              <div className="p-2 rounded-2xl shadow-lg shadow-gray-200">
                <LiaUsersSolid className="w-6 h-6 md:w-7 md:h-7 text-gray-600" />
              </div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900">All Users</h1>
            </div>
            <p className="text-xs md:text-sm text-slate-500 font-medium ml-12">
              Total number of users:
              <span className="ml-1 text-gray-900 font-semibold">{users.length}</span>
            </p>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Find a member..."
                className="pl-11 pr-3 py-2.5 md:py-3 w-full sm:w-64 bg-white shadow-sm rounded-2xl focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <button
              onClick={() => setAddingUser(true)}
              className="p-2.5 md:p-3 bg-slate-800 text-white rounded-2xl hover:bg-slate-900 transition-all shadow-xl active:scale-95"
            >
              <Plus className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block bg-white rounded-[2.5rem] shadow-sm border border-white -mt-2 md:-mt-4 overflow-x-auto">
          <table className="w-full border-separate border-spacing-0 min-w-[600px]">
            <thead>
              <tr className="text-slate-400">
                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.2em]">Member</th>
                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.2em]">Role</th>
                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.2em]">Join Date</th>
                <th className="px-6 py-4 text-right text-[11px] font-bold uppercase tracking-[0.2em]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50/50">
              {paginated.map((u) => (
                <tr key={u.id} className="group hover:bg-white transition-all duration-300">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-[1.2rem] bg-slate-100 flex items-center justify-center font-bold text-slate-600 group-hover:bg-slate-800 group-hover:text-white group-hover:rotate-3 transition-all duration-500">
                        {u.first_name[0]}{u.last_name[0]}
                      </div>
                      <div>
                        <div className="font-bold text-slate-800 text-base">{u.first_name} {u.last_name}</div>
                        <div className="text-sm text-slate-400 font-medium">#{u.id} • {u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div
                      className={`
      inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide
      ${u.role === "admin"
                          ? "bg-slate-700 text-slate-200"
                          : "bg-slate-100 text-slate-800 border border-slate-300"}
      transition-colors duration-200
    `}
                    >
                      <span
                        className={`w-2 h-2 rounded-full 
        ${u.role === "admin" ? "bg-slate-200" : "bg-slate-600"}`}
                      ></span>
                      {u.role}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600 font-bold">
                      <Calendar className="w-4 h-4 text-slate-300" />
                      {new Date(u.created_at).toLocaleDateString('en-GB')}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setEditingUser(u)}
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:bg-indigo-50 hover:text-indigo-900 transition-all"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(u.id)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden">
          {paginated.map((u) => (
            <div key={u.id} className="p-3 sm:p-4 border-b border-slate-50 last:border-none">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-2xl bg-slate-800 text-white flex items-center justify-center font-bold text-base">{u.first_name[0]}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm truncate">{u.first_name} {u.last_name}</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1 truncate">
                    <Calendar className="w-3 h-3" />
                    {new Date(u.created_at).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => setEditingUser(u)}
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:bg-indigo-50 hover:text-indigo-900"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(u.id)} className="p-2 bg-slate-50 rounded-xl text-red-400"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
              <div className="flex items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-100 flex-wrap">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{u.role}</span>
                <span className="text-xs font-medium text-slate-500 truncate max-w-full">{u.email}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 md:mt-10 flex items-center justify-between px-2 md:px-4">
          <div className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
            Page {page} <span className="mx-2 text-slate-200">|</span> {totalPages}
          </div>
          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => { setPage(p => p - 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white shadow-sm hover:shadow-md disabled:opacity-30 transition-all font-black text-slate-600 text-[11px] uppercase tracking-widest border border-transparent hover:border-slate-100"
            >
              <ChevronLeft className="w-4 h-4" /> Prev
            </button>
            <button
              disabled={page === totalPages}
              onClick={() => { setPage(p => p + 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white shadow-sm hover:shadow-md disabled:opacity-30 transition-all font-black text-slate-600 text-[11px] uppercase tracking-widest border border-transparent hover:border-slate-100"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {editingUser && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-6 w-full max-w-md">
              <h2 className="text-xl font-black mb-4">Edit User</h2>

              <div className="space-y-3">
                <input
                  className="w-full p-3 rounded-xl border"
                  value={editingUser.first_name}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, first_name: e.target.value })
                  }
                  placeholder="First name"
                />

                <input
                  className="w-full p-3 rounded-xl border"
                  value={editingUser.last_name}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, last_name: e.target.value })
                  }
                  placeholder="Last name"
                />

                <input
                  className="w-full p-3 rounded-xl border"
                  value={editingUser.email}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, email: e.target.value })
                  }
                  placeholder="Email"
                />

                <select
                  className="w-full p-3 rounded-xl border"
                  value={editingUser.role}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, role: e.target.value })
                  }
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-white"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {addingUser && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-6 w-full max-w-md">
              <h2 className="text-xl font-black mb-4">Add New User</h2>

              <div className="space-y-3">
                <input
                  className="w-full p-3 rounded-xl border"
                  value={newUser.first_name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, first_name: e.target.value })
                  }
                  placeholder="First name"
                />
                <input
                  className="w-full p-3 rounded-xl border"
                  value={newUser.last_name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, last_name: e.target.value })
                  }
                  placeholder="Last name"
                />
                <input
                  className="w-full p-3 rounded-xl border"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  placeholder="Email"
                />
                <input
                  type="password"
                  className="w-full p-3 rounded-xl border"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                  placeholder="Password"
                />
                <select
                  className="w-full p-3 rounded-xl border"
                  value={newUser.role}
                  onChange={(e) =>
                    setNewUser({ ...newUser, role: e.target.value })
                  }
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  onClick={() => setAddingUser(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddUser}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-white"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
