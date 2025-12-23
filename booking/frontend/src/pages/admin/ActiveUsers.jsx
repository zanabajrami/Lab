import React, { useEffect, useState } from "react";

function ActiveUsers() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

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

  return (
    <div className="p-6">
      <h2 className="text-gray-500 mb-4 font-bold text-lg">Active Users</h2>
      <table className="w-full text-left border-collapse bg-white rounded-xl shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Last Login</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b">
              <td className="p-2">{user.id}</td>
              <td className="p-2">{user.first_name} {user.last_name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.role}</td>
              <td className="p-2">
                {user.last_login_at ? new Date(user.last_login_at).toLocaleString() : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ActiveUsers;
