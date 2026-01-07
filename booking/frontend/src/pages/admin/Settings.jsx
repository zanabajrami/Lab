import React, { useEffect, useState } from "react";
import axios from "axios";

function Settings() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setError("NOT_AUTH");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("http://localhost:8000/api/me", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
        setProfile(res.data);
      } catch (err) {
        if (err.response?.status === 401) setError("NOT_AUTH");
        else setError("UNKNOWN");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const handleSave = async () => {
    try {
      await axios.put(
        "http://localhost:8000/api/me",
        { notifications: profile.notifications },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      alert("Settings saved ✅");
    } catch {
      alert("You need to log in again ❌");
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600"></div>
    </div>
  );

  if (error === "NOT_AUTH")
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg text-center">
          <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Session expired</h2>
          <p className="text-gray-500 mt-2 mb-6">Your session has timed out. Please log in again to continue.</p>
          <button
            onClick={() => { localStorage.removeItem("token"); window.location.href = "/login"; }}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-xl transition-colors shadow-md"
          >
            Go to Login
          </button>
        </div>
      </div>
    );

  if (!profile) return <div className="p-10 text-center text-red-500 font-medium">Unable to load profile</div>;

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8 rounded-[2.5rem]">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 -mt-7">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Account Settings</h1>
          <p className="text-gray-500 mt-1">Manage your profile and notification preferences.</p>
        </header>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header Section */}
          <div className="p-6 border-b border-gray-50 bg-white">
            <h2 className="text-lg font-bold text-gray-800">Personal Information</h2>
          </div>

          {/* Form Section */}
          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <Input label="First Name" value={profile.first_name} />
            <Input label="Last Name" value={profile.last_name} />
            <Input label="Email Address" value={profile.email} />
            <Input label="Role" value={profile.role} />
          </div>

          {/* Danger Zone Section - Delete Account */}
          <div className="px-6 py-6 bg-red-50/30 border-t border-red-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="max-w-md">
                <h3 className="text-base font-bold text-red-800 flex items-center">
                  {/* Ikona e rrezikut vetëm për titullin në mobile */}
                  <svg className="w-5 h-5 mr-2 md:hidden" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Delete Account
                </h3>
                <p className="text-sm text-red-600/80 mt-1">
                  Once you delete your account, there is no going back. All your data will be permanently removed.
                </p>
              </div>

              <div className="w-full md:w-auto">
                <button
                  onClick={() => {
                    if (window.confirm("Are you sure? This action cannot be undone.")) {
                      // Logjika këtu
                    }
                  }}
                  className="flex items-center justify-center w-full md:w-auto px-6 py-3 border-2 border-red-200 text-sm font-bold rounded-xl text-red-600 bg-white hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-200 shadow-sm active:scale-95"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
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

function Input({ label, value }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">{label}</label>
      <input
        value={value ?? ""}
        disabled
        className="w-full bg-gray-50 border border-gray-200 text-gray-500 rounded-xl p-3 text-sm cursor-not-allowed focus:outline-none transition-colors"
      />
    </div>
  );
}

export default Settings;