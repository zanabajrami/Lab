import React, { useState } from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import Dashboard from "./Dashboard";
import Users from "./Users";
import LastLogin from "./LoginActivity";
import Settings from "./Settings";
import Bookings from "./Bookings";
import CancelBookings from "./CancelBookings";
import Hotels from "./Hotels";

function AdminLayout() {
    const [activePage, setActivePage] = useState("dashboard");
    const [isSidebarCollapsed,] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.role !== "admin") {
        return <p className="p-8 text-gray-600 text-center font-bold">You are not authorized to view this page.</p>;
    }

    return (
        <div className="flex h-screen bg-gray-100 overflow-hidden">
            <Sidebar
                activePage={activePage}
                setActivePage={setActivePage}
            />
            <div className="flex-1 flex flex-col min-h-0">
                <Topbar />
                <main className="flex-1 p-6 overflow-y-auto min-h-0">
                    <div className="max-w-[1400px] mx-auto">
                        {activePage === "dashboard" && <Dashboard />}
                        {activePage === "users" && <Users />}
                        {activePage === "last-login" && <LastLogin />}
                        {activePage === "bookings" && <Bookings />}
                        {activePage === "cancel-bookings" && <CancelBookings />}
                        {activePage === "settings" && <Settings />}
                        {activePage === "hotels" && <Hotels />} 
                    </div>
                </main>
            </div>
        </div>
    );
}

export default AdminLayout;
