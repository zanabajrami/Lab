function Topbar() {
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
    };


    return (
        <header className="h-16 bg-white border-b flex items-center justify-between px-6">
            <h1 className="text-lg font-semibold">Admin Dashboard</h1>


            <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-2xl bg-red-500 text-white hover:bg-red-600"
            >
                Logout
            </button>
        </header>
    );
}


export default Topbar;