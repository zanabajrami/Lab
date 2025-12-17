function Topbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold">Admin Dashboard</h1>

      <div className="flex items-center gap-4">
        <span className="text-gray-700 font-medium">
          {user?.email}
        </span>
      </div>
    </header>
  );
}

export default Topbar;
