import React, { useState } from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import Dashboard from "./Dashboard";
import Users from "./Users";
import LastLogin from "./LoginActivity";
import Settings from "./Settings";
import Bookings from "./Bookings";

function AdminLayout() {
    const [activePage, setActivePage] = useState("dashboard");
    const [isSidebarCollapsed,] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.role !== "admin") {
        return <p className="p-8 text-gray-600 text-center font-bold">You are not authorized to view this page.</p>;
    }

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar
                activePage={activePage}
                setActivePage={setActivePage}
            />
            <div className="flex-1 flex flex-col">
                <Topbar />
                <main className="p-6 overflow-y-auto">
                    <div className="max-w-[1400px] mx-auto">
                        {activePage === "dashboard" && <Dashboard isSidebarCollapsed={isSidebarCollapsed} />}
                        {activePage === "users" && <Users isSidebarCollapsed={isSidebarCollapsed} />}
                        {activePage === "last-login" && <LastLogin isSidebarCollapsed={isSidebarCollapsed} />}
                        {activePage === "bookings" && <Bookings />}
                        {activePage === "settings" && <Settings isSidebarCollapsed={isSidebarCollapsed} />} 
                    </div>
                </main>
            </div>
        </div>
    );
}

export default AdminLayout;
