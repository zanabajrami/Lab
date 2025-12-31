import React, { useEffect, useMemo, useState } from "react";
import { LockKeyholeOpen } from "lucide-react";

export default function LastLogin() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(window.innerWidth < 768 ? 4 : 7);
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

    const filtered = useMemo(() =>
        users.filter(u =>
            `${u.first_name} ${u.last_name} ${u.email}`
                .toLowerCase()
                .includes(search.toLowerCase())
        ), [users, search]);

    const totalPages = Math.ceil(filtered.length / perPage);
    const paginated = filtered.slice(
        (page - 1) * (window.innerWidth < 768 ? 3 : perPage),
        page * (window.innerWidth < 768 ? 3 : perPage)
    );

    useEffect(() => {
        const handleResize = () => setPerPage(window.innerWidth < 768 ? 3 : 7);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const renderLastLogin = (user) => {
        return user.last_login_at
            ? new Date(user.last_login_at).toLocaleString("en-GB", { timeZone: "Europe/Belgrade" })
            : "Never";
    };

    return (
        <div className="max-w-6xl mx-auto my-8 px-4 antialiased -mt-3">
            <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-8 bg-white">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <div className="p-2 rounded-2xl shadow-lg shadow-gray-200">
                                <LockKeyholeOpen className="w-5 h-5 md:w-7 md:h-6 text-gray-600" />
                            </div>
                            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Login Activity</h2>
                        </div>
                        <p className="text-sm text-gray-500 ml-10">Manage and track user login sessions.</p>
                    </div>

                    <div className="relative group md:max-w-xs w-full">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                            <svg className="w-4 h-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </div>
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search name or email..."
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none"
                        />
                    </div>
                </div>

                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 border-y border-gray-100">
                                <th className="px-8 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-[0.1em]">ID</th>
                                <th className="px-8 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-[0.1em]">User Information</th>
                                <th className="px-8 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-[0.1em]">Role</th>
                                <th className="px-8 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-[0.1em]">Last Login</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {paginated.map(u => (
                                <tr key={u.id} className="hover:bg-indigo-50/40 transition-all group">
                                    <td className="px-8 py-5 text-sm text-gray-400 font-mono">#{u.id}</td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)]">
                                                <span className="text-[11px] font-bold text-gray-600 tracking-tight uppercase">
                                                    {u.first_name[0]}{u.last_name[0]}
                                                </span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-gray-900 group-hover:text-indigo-900 transition-colors">
                                                    {u.first_name} {u.last_name}
                                                </span>
                                                <span className="text-xs text-gray-500">{u.email}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider border
                                            ${u.role === "admin"
                                                ? "bg-indigo-100 text-indigo-900 border-indigo-200/60"
                                                : "bg-blue-50 text-blue-700 border-blue-200/60"}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${u.role === "admin" ? "bg-indigo-900" : "bg-blue-500"}`}></span>
                                            {u.role}
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="font-medium">{renderLastLogin(u)}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden divide-y divide-gray-100">
                    {paginated.map(u => (
                        <div key={u.id} className="p-6 hover:bg-gray-50 transition-colors">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-900 font-bold">
                                        {u.first_name[0]}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">{u.first_name} {u.last_name}</h3>
                                        <p className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">ID: #{u.id}</p>
                                    </div>
                                </div>
                                <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-tighter border
                                    ${u.role === "admin" ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-emerald-50 text-emerald-700 border-emerald-200"}`}>
                                    {u.role}
                                </span>
                            </div>
                            <div className="grid grid-cols-1 gap-2 bg-gray-50 p-3 rounded-xl">
                                <div className="flex items-center text-xs text-gray-600 gap-2">
                                    <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                    <span className="truncate">{u.email}</span>
                                </div>
                                <div className="flex items-center text-xs text-gray-600 gap-2">
                                    <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span>{renderLastLogin(u)}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination Section */}
                <div className="flex flex-col sm:flex-row items-center justify-between p-8 bg-white border-t border-gray-50 gap-6">
                    <p className="text-sm text-gray-400">
                        Showing <span className="font-bold text-gray-900">{(page - 1) * perPage + 1}</span> to <span className="font-bold text-gray-900">{Math.min(page * perPage, filtered.length)}</span> of <span className="font-bold text-gray-900">{filtered.length}</span>
                    </p>

                    <div className="flex items-center gap-2">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage(p => p - 1)}
                            className="p-2.5 text-gray-500 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-90"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                        </button>

                        <div className="flex items-center px-4 py-2 bg-indigo-50 rounded-xl border border-indigo-100">
                            <span className="text-sm font-bold text-indigo-900">Page {page}</span>
                        </div>

                        <button
                            disabled={page === totalPages}
                            onClick={() => setPage(p => p + 1)}
                            className="p-2.5 text-gray-500 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-90"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}