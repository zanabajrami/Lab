import React, { useEffect, useMemo, useState, useRef } from "react";

export default function ActiveUsers() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(window.innerWidth < 768 ? 4 : 7);
    const token = localStorage.getItem("token");
    const headerRef = useRef(null);

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

    useEffect(() => {
        const handleResize = () => setPerPage(window.innerWidth < 768 ? 4 : 7);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const renderStatus = (user) => user.is_logged_in ? "Active" : "Not Active";

    return (
        <div className="bg-white rounded-2xl shadow-lg">
            {/* Header */}
            <div
                ref={headerRef}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-5 border-b border-gray-200"
            >
                <h2 className="text-xl font-bold text-gray-800">Active Users</h2>
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search users..."
                    className="flex-1 pl-4 pr-4 py-2 border rounded-xl text-sm shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                />
            </div>

            {/* Table for desktop */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm min-w-[600px]">
                    <thead className="bg-gray-50 text-gray-600">
                        <tr>
                            <th className="px-4 py-3 text-left">ID</th>
                            <th className="px-4 py-3 text-left">Name</th>
                            <th className="px-4 py-3 text-left">Email</th>
                            <th className="px-4 py-3 text-left">Role</th>
                            <th className="px-4 py-3 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginated.map((u) => (
                            <tr key={u.id} className="border-b hover:bg-indigo-50 transition">
                                <td className="px-4 py-3 font-medium text-gray-900">{u.id}</td>
                                <td className="px-4 py-3 font-medium text-gray-900">{u.first_name} {u.last_name}</td>
                                <td className="px-4 py-3 text-gray-900 break-words">{u.email}</td>
                                <td className="px-4 py-3">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize
                                        ${u.role === "admin" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                                        {u.role}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-gray-600">{renderStatus(u)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden p-4 space-y-4">
                {paginated.map((u) => (
                    <div key={u.id} className="border rounded-xl p-4 shadow hover:shadow-lg transition">
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-bold text-gray-900">{u.first_name} {u.last_name}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize
                                ${u.role === "admin" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                                {u.role}
                            </span>
                        </div>
                        <p className="text-gray-600 text-sm">Email: {u.email}</p>
                        <p className="text-gray-600 text-sm">Status: {renderStatus(u)}</p>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex flex-col md:flex-row items-center justify-between p-4 text-sm gap-2">
                <span className="text-gray-600">
                    Showing {(page - 1) * perPage + 1}-{Math.min(page * perPage, filtered.length)} of {filtered.length}
                </span>
                <div className="flex gap-2">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage((p) => p - 1)}
                        className="px-3 py-1 border rounded-lg disabled:opacity-50 hover:bg-gray-100 transition"
                    >
                        Previous
                    </button>
                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage((p) => p + 1)}
                        className="px-3 py-1 border rounded-lg disabled:opacity-50 hover:bg-gray-100 transition"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
