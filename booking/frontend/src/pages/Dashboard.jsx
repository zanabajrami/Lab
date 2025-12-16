import React, { useState, useEffect } from "react";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true); // për collapsible sidebar
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
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-16"
        } bg-white border-r transition-all duration-300`}
      >
        <div className="p-6 text-2xl font-bold text-indigo-900">
          {sidebarOpen ? "Admin Panel" : "AP"}
        </div>
        <nav className="px-4 space-y-2">
          <button
            className="block w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
          </button>
          <a
            className={`block px-4 py-2 rounded-lg ${
              sidebarOpen ? "bg-indigo-50 text-indigo-900 font-medium" : ""
            }`}
          >
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
        <div className="bg-white border-b px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-700">
            Admin Dashboard
          </h1>
          <span className="text-gray-600">{user.email}</span>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm font-medium text-gray-500">Total Users</p>
            <p className="mt-2 text-xl font-bold text-gray-700">
              {users.length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm font-medium text-gray-500">Admins</p>
            <p className="mt-2 text-xl font-bold text-gray-700">
              {users.filter((u) => u.role === "admin").length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm font-medium text-gray-500">Regular Users</p>
            <p className="mt-2 text-xl font-bold text-gray-700">
              {users.filter((u) => u.role !== "admin").length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm font-medium text-gray-500">Latest User</p>
            <p className="mt-2 text-xl font-bold text-gray-700">
              {users.length ? users[users.length - 1].first_name : "-"}
            </p>
          </div>
        </div>

        {/* Users Table */}
        <div className="p-6">
          <div className="bg-white shadow rounded-lg overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Role</th>
                  <th className="px-4 py-2 text-left">First Name</th>
                  <th className="px-4 py-2 text-left">Last Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Created</th>
                  <th className="px-4 py-2 text-left">Updated</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{u.id}</td>
                    <td className="px-4 py-2">{u.role}</td>
                    <td className="px-4 py-2">{u.first_name}</td>
                    <td className="px-4 py-2">{u.last_name}</td>
                    <td className="px-4 py-2">{u.email}</td>
                    <td className="px-4 py-2">
                      {new Date(u.created_at).toLocaleString()}
                    </td>
                    <td className="px-4 py-2">
                      {new Date(u.updated_at).toLocaleString()}
                    </td>
                    <td className="px-4 py-2 flex gap-2 flex-wrap">
                      <button
                        className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                        onClick={() =>
                          alert(`Edit user ${u.id} - implementohet form`)
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                        onClick={() => handleDelete(u.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td
                      colSpan="8"
                      className="text-center py-6 text-gray-500"
                    >
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
