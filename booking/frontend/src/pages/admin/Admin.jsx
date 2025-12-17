import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import Dashboard from "./Dashboard";
import Users from "./Users";

function AdminLayout() {
    const [activePage, setActivePage] = useState("dashboard");
    const user = JSON.parse(localStorage.getItem("user"));


    if (!user || user.role !== "admin") {
        return (
            <p className="p-8 text-red-600 font-bold">
                You are not authorized to view this page.
            </p>
        );
    }

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar activePage={activePage} setActivePage={setActivePage} />


            <div className="flex-1 flex flex-col">
                <Topbar />


                <main className="p-6 overflow-y-auto">
                    {activePage === "dashboard" && <Dashboard />}
                    {activePage === "users" && <Users />}
                </main>
            </div>
        </div>
    );
}

export default AdminLayout;