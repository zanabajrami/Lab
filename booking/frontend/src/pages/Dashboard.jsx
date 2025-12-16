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
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };

    fetchUsers();
  }, [token]);

  // Delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/users/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setUsers(users.filter(u => u.id !== id));
        alert("User deleted successfully!");
      } else {
        alert("Failed to delete user");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Kontrollo rolin, vetëm admin mund të shoh dashboard
  if (!user || user.role !== "admin") {
    return <p className="p-8 text-red-600 font-bold">You are not authorized to view this page.</p>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl text-gray-700 text-center font-bold mb-6">Admin Dashboard</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2 border-b">ID</th>
              <th className="px-4 py-2 border-b">Role</th>
              <th className="px-4 py-2 border-b">First Name</th>
              <th className="px-4 py-2 border-b">Last Name</th>
              <th className="px-4 py-2 border-b">Email</th>
              <th className="px-4 py-2 border-b">Created At</th>
              <th className="px-4 py-2 border-b">Updated At</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} className="bg-gray-100 hover:bg-gray-200">
                <td className="px-4 py-2 border-b">{u.id}</td>
                <td className="px-4 py-2 border-b">{u.role}</td>
                <td className="px-4 py-2 border-b">{u.first_name}</td>
                <td className="px-4 py-2 border-b">{u.last_name}</td>
                <td className="px-4 py-2 border-b">{u.email}</td>
                <td className="px-4 py-2 border-b">{new Date(u.created_at).toLocaleString()}</td>
                <td className="px-4 py-2 border-b">{new Date(u.updated_at).toLocaleString()}</td>
                <td className="px-4 py-2 border-b flex gap-2">
                  {/* Edit button */}
                  <button
                    className="px-3 py-1 bg-indigo-900 text-indigo-100 rounded hover:bg-indigo-800"
                    onClick={() => alert(`Edit user ${u.id} - duhet me implementu form`)}
                  >
                    Edit
                  </button>

                  {/* Delete button */}
                  <button
                    className="px-3 py-1 bg-indigo-300 text-indigo-900 rounded hover:bg-indigo-400"
                    onClick={() => handleDelete(u.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
