import React, { useEffect, useMemo, useState, useRef } from "react";
import { Plus, Trash2, Pencil } from "lucide-react";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(window.innerWidth < 768 ? 4 : 7); const token = localStorage.getItem("token");
  const headerRef = useRef(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("http://127.0.0.1:8000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setUsers(data);
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

  useEffect(() => {
    const handleResize = () => {
      setPerPage(window.innerWidth < 768 ? 4 : 7);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    const res = await fetch(`http://127.0.0.1:8000/api/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <div className="bg-white rounded-2xl shadow">
      {/* Header */}
      <div
        ref={headerRef}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-5 border-b"
      >
        <h2 className="text-xl font-semibold text-gray-800">All users</h2>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for users"
            className="flex-1 pl-4 pr-4 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-indigo-500"
          />
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-100 text-gray-600 text-sm border border-indigo-200 hover:bg-indigo-200 hover:border-indigo-400">
            <Plus className="w-4 h-4" />
            Add user
          </button>
        </div>
      </div>

      {/* Table for desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm min-w-[600px]">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Last Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Created At</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((u) => (
              <tr key={u.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{u.id}</td>
                <td className="px-4 py-3 font-medium text-gray-900">
                  {u.first_name}
                </td>
                <td className="px-4 py-3 font-medium text-gray-900">
                  {u.last_name}
                </td>
                <td className="px-4 py-3 text-gray-900 break-words">{u.email}</td>
                <td className="px-4 py-3 capitalize">{u.role}</td>
                <td className="px-4 py-3 text-gray-900">{new Date(u.created_at).toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-center gap-2">
                    <button className="p-2 rounded-lg hover:bg-indigo-100 text-indigo-800">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(u.id)}
                      className="p-2 rounded-lg hover:bg-red-100 text-red-600"
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

      {/* Mobile Cards */}
      <div className="md:hidden p-4 space-y-4">
        {paginated.map((u) => (
          <div key={u.id} className="border rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-gray-900">{u.first_name} {u.last_name}</span>
              <div className="flex gap-2">
                <button className="p-2 rounded-lg hover:bg-indigo-100 text-indigo-600">
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(u.id)}
                  className="p-2 rounded-lg hover:bg-red-100 text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-gray-600 text-sm">ID: {u.id}</p>
            <p className="text-gray-600 text-sm capitalize">Role: {u.role}</p>
            <p className="text-gray-600 text-sm">Email: {u.email}</p>
            <p className="text-gray-600 text-sm">Created At: {new Date(u.created_at).toLocaleDateString()}</p>
          </div>
        ))}
      </div>

      {/* Footer / Pagination */}
      <div className="flex flex-col md:flex-row items-center justify-between p-4 text-sm gap-2">
        <span className="text-gray-600">
          Showing {(page - 1) * perPage + 1}-{Math.min(page * perPage, filtered.length)} of {filtered.length}
        </span>
        <div className="flex gap-2">
          <button
            disabled={page === 1}
            onClick={() => {
              setPage((p) => p - 1);
              window.scrollTo({ top: 0, behavior: "smooth" }); 
            }}
            className="px-3 py-1 border rounded-lg disabled:opacity-50"
          >
            Previous
          </button>

          <button
            disabled={page === totalPages}
            onClick={() => {
              setPage((p) => p + 1);
              window.scrollTo({ top: 0, behavior: "smooth" }); 
            }}
            className="px-3 py-1 border rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}