import { useEffect, useState } from "react";

function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      if (!token) return alert("You must log in first!");

      try {
        const res = await fetch("http://127.0.0.1:8000/api/users", {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        });

        if (!res.ok) {
          const error = await res.json();
          throw new Error(JSON.stringify(error));
        }

        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch users. Check console.");
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">All Users</h2>
      <ul>
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user.id}>
              {user.id} - {user.first_name} {user.last_name} ({user.email})
            </li>
          ))
        ) : (
          <li>No users found.</li>
        )}
      </ul>
    </div>
  );
}

export default UsersList;
