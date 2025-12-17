function Sidebar({ activePage, setActivePage }) {
    return (
        <aside className="w-64 bg-white border-r hidden md:block">
            <div className="p-6 text-xl font-bold">Admin Panel</div>


            <nav className="px-4 space-y-2">
                <button
                    onClick={() => setActivePage("dashboard")}
                    className={`w-full text-left px-4 py-2 rounded-lg font-medium ${activePage === "dashboard"
                            ? "bg-indigo-100 text-indigo-700"
                            : "hover:bg-gray-100"
                        }`}
                >
                    Dashboard
                </button>


                <button
                    onClick={() => setActivePage("users")}
                    className={`w-full text-left px-4 py-2 rounded-lg font-medium ${activePage === "users"
                            ? "bg-indigo-100 text-indigo-700"
                            : "hover:bg-gray-100"
                        }`}
                >
                    Users
                </button>
            </nav>
        </aside>
    );
}


export default Sidebar;