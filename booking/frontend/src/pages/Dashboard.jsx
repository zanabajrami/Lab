import React, { useState, useEffect } from "react";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      if (!token) return;
      try {
        const res = await fetch("http://127.0.0.1:8000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };
    fetchUsers();
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setUsers(users.filter((u) => u.id !== id));
        alert("User deleted successfully!");
      } else alert("Failed to delete user");
    } catch (err) {
      console.error(err);
    }
  };

  if (!user || user.role !== "admin") {
    return (
      <p className="p-8 text-red-600 font-bold">
        You are not authorized to view this page.
      </p>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r">
        <div className="p-6 text-2xl font-bold text-indigo-900">
          Admin Panel
        </div>
        <nav className="px-4 space-y-2">
          <a className="block px-4 py-2 rounded-lg bg-indigo-50 text-indigo-900 font-medium">
            Dashboard
          </a>
          <a className="block px-4 py-2 rounded-lg hover:bg-gray-100">
            Users
          </a>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-x-auto">
        {/* Topbar */}
        <div className="bg-white border-b px-4 py-4 flex justify-between items-center md:px-6">
          <h1 className="text-lg md:text-xl font-semibold text-gray-700">
            Admin Dashboard
          </h1>
          <span className="text-gray-600 text-sm md:text-base">{user.email}</span>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6">
          <div className="bg-white shadow rounded-lg overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-2 md:px-4 py-2 text-left">ID</th>
                  <th className="px-2 md:px-4 py-2 text-left">Role</th>
                  <th className="px-2 md:px-4 py-2 text-left">First Name</th>
                  <th className="px-2 md:px-4 py-2 text-left">Last Name</th>
                  <th className="px-2 md:px-4 py-2 text-left">Email</th>
                  <th className="px-2 md:px-4 py-2 text-left">Created</th>
                  <th className="px-2 md:px-4 py-2 text-left">Updated</th>
                  <th className="px-2 md:px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50">
                    <td className="px-2 md:px-4 py-2">{u.id}</td>
                    <td className="px-2 md:px-4 py-2">{u.role}</td>
                    <td className="px-1 md:px-2 py-2 w-20">{u.first_name}</td>
                    <td className="px-1 md:px-2 py-2 w-20">{u.last_name}</td>
                    <td className="px-2 md:px-4 py-2 min-w-[200px]">{u.email}</td>
                    <td className="px-2 md:px-4 py-2">{new Date(u.created_at).toLocaleString()}</td>
                    <td className="px-2 md:px-4 py-2">{new Date(u.updated_at).toLocaleString()}</td>
                    <td className="px-2 md:px-4 py-2 flex gap-2 flex-wrap">
                      <button
                        className="px-2 md:px-3 py-1 text-xs md:text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
                        onClick={() => alert(`Edit user ${u.id} - implementohet form`)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-2 md:px-3 py-1 text-xs md:text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
                        onClick={() => handleDelete(u.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan="8" className="text-center py-6 text-gray-500">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
