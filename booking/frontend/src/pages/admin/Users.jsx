import React, { useEffect, useState } from "react";


function Users() {
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem("token");


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


    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure?")) return;


        const res = await fetch(`http://127.0.0.1:8000/api/users/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });


        if (res.ok) {
            setUsers(users.filter(u => u.id !== id));
        }
    };


    return (
        <div className="overflow-x-auto bg-white p-6 rounded-xl shadow">
            <table className="min-w-full">
                <thead>
                    <tr className="border-b">
                        <th>ID</th>
                        <th>Role</th>
                        <th>First</th>
                        <th>Last</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u => (
                        <tr key={u.id} className="border-b">
                            <td>{u.id}</td>
                            <td>{u.role}</td>
                            <td>{u.first_name}</td>
                            <td>{u.last_name}</td>
                            <td>{u.email}</td>
                            <td className="flex gap-2">
                                <button className="px-2 py-1 bg-indigo-900 text-white rounded">Edit</button>
                                <button
                                    onClick={() => handleDelete(u.id)}
                                    className="px-2 py-1 bg-indigo-300 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}


export default Users;