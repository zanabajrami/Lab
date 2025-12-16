import React, { useState, useEffect } from "react";
import Sidebar from "../components/Admin/Sidebar";
import Topbar from "../components/Admin/Topbar";
import StatsCards from "../components/Admin/stats/StatsCards";
import UsersTable from "../components/Admin/users/UsersTable";

function Dashboard() {
  const [activePage, setActivePage] = useState("dashboard");
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

  const handleDelete = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  if (!user || user.role !== "admin") {
    return <p className="p-8 text-red-600 font-bold">Not authorized</p>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <main className="flex-1 overflow-x-auto">
        <Topbar email={user.email} pageTitle={activePage} />

        {activePage === "dashboard" && <StatsCards users={users} />}
        {activePage === "users" && (
          <UsersTable users={users} onDelete={handleDelete} />
        )}
      </main>
    </div>
  );
}

export default Dashboard;
