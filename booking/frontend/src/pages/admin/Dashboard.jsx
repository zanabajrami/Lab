import React, { useEffect, useState } from "react";
import UsersChart from "../../components/charts/UsersChart";

function Dashboard() {
  const [usersStats, setUsersStats] = useState([]);
  const token = localStorage.getItem("token");
  const [ageStats, setAgeStats] = useState({});

  useEffect(() => {
    const fetchUsersStats = async () => {
      try {
        const res = await fetch(
          "http://127.0.0.1:8000/api/users/stats/daily",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        setUsersStats(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsersStats();
  }, [token]);

  const calculateAge = (birthday) => {
    const birthDate = new Date(birthday);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const m =
      today.getMonth() - birthDate.getMonth() ||
      today.getDate() - birthDate.getDate();

    if (m < 0) age--;
    return age;
  };

  const groupAges = (users) => {
    const groups = {
      "20+": 0,
      "30+": 0,
      "40+": 0,
      "50+": 0,
    };

    users.forEach((user) => {
      if (!user.birthday) return;

      const age = calculateAge(user.birthday);

      if (age >= 50) groups["50+"]++;
      else if (age >= 40) groups["40+"]++;
      else if (age >= 30) groups["30+"]++;
      else if (age >= 20) groups["20+"]++;
    });

    return groups;
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const users = await res.json();
        setAgeStats(groupAges(users));
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, [token]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">Total Users</h2>
          <p className="text-3xl font-bold mt-2">
            {usersStats.reduce((sum, u) => sum + u.count, 0)}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">Revenue</h2>
          <p className="text-3xl font-bold mt-2">$0</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">New Signups</h2>
          <p className="text-3xl font-bold mt-2">
            {usersStats[usersStats.length - 1]?.count || 0}
          </p>
        </div>
      </div>

      {/* Chart ditore */}
      <UsersChart usersData={usersStats} />

      <div className="bg-white p-6 rounded-xl shadow mt-6">
        <h2 className="text-lg font-semibold mb-4">Audience by age</h2>
        
        {Object.entries(ageStats).map(([label, value]) => (
          <div key={label} className="flex items-center justify-between py-2">
            <span className="text-gray-600">{label}</span>
            <span className="font-semibold">{value}</span>
          </div>
        ))}
      </div>

    </>
  );
}

export default Dashboard;
