import React, { useState } from "react";

function Settings() {
  const [profile, setProfile] = useState({
    username: "admin",
    email: "admin@bookinn.com",
    notifications: true,
    role: "Administrator",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] p-4 md:p-10">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
          <p className="text-gray-500">Manage your profile information and preferences.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar Tabs */}
          <nav className="space-y-1">
            {["General", "Security", "Notifications", "Billing"].map((item) => (
              <button
                key={item}
                className={`w-full text-left px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                  item === "General" 
                    ? "bg-white text-indigo-600 shadow-sm ring-1 ring-gray-200" 
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>

          {/* Main Content Area */}
          <div className="md:col-span-3 space-y-6">
            
            {/* Profile Card */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">Public Profile</h2>
                <p className="text-sm text-gray-500">This information will be displayed publicly.</p>
              </div>

              <div className="p-6 space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center gap-6">
                  <div className="h-20 w-20 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xl border-2 border-white shadow-md">
                    JD
                  </div>
                  <button className="px-4 py-2 text-sm font-semibold border border-gray-300 rounded-md hover:bg-gray-50 transition">
                    Change Photo
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <input
                      name="username"
                      type="text"
                      value={profile.username}
                      onChange={handleChange}
                      className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border p-2.5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      name="email"
                      type="email"
                      value={profile.email}
                      onChange={handleChange}
                      className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border p-2.5"
                    />
                  </div>
                </div>
              </div>

              {/* Toggle Section */}
              <div className="px-6 py-4 bg-gray-50 flex items-center justify-between border-t border-gray-100">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Email Notifications</h3>
                  <p className="text-xs text-gray-500">Receive weekly reports via email.</p>
                </div>
                <button 
                  onClick={() => setProfile(p => ({...p, notifications: !p.notifications}))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${profile.notifications ? 'bg-indigo-600' : 'bg-gray-200'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${profile.notifications ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>

              <div className="p-6 bg-gray-50 text-right rounded-b-xl border-t border-gray-100">
                <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-indigo-700 shadow-sm transition-all active:scale-95">
                  Save All Changes
                </button>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-white border border-red-100 rounded-xl shadow-sm">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-red-600">Danger Zone</h2>
                <p className="text-sm text-gray-500 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                <button className="text-red-600 font-medium hover:text-red-700 underline text-sm">
                  Delete Account
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;