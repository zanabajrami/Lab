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

  const toggleNotifications = () => {
    setProfile((prev) => ({
      ...prev,
      notifications: !prev.notifications,
    }));
  };

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

  // UI STATES
  if (loading) return <p className="p-10">Loading...</p>;

  if (error === "NOT_AUTH")
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-semibold text-red-600">
          Session expired
        </h2>
        <p className="text-gray-500 mb-4">Please log in again.</p>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg"
        >
          Go to Login
        </button>
      </div>
    );

  if (!profile) return <p className="p-10 text-red-500">Unable to load profile</p>;

  return (
    <div className="min-h-screen bg-[#f9fafb] p-4 md:p-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Account Settings</h1>

        <div className="bg-white border rounded-xl shadow-sm">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">Profile</h2>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="First Name" value={profile.first_name} />
            <Input label="Last Name" value={profile.last_name} />
            <Input label="Email" value={profile.email} />
            <Input label="Role" value={profile.role} />
          </div>

          <div className="px-6 py-4 bg-gray-50 flex justify-between items-center border-t">
            <div>
              <h3 className="text-sm font-semibold">Email Notifications</h3>
              <p className="text-xs text-gray-500">Receive updates via email</p>
            </div>
            <button
              onClick={toggleNotifications}
              className={`relative inline-flex h-6 w-11 rounded-full ${
                profile.notifications ? "bg-indigo-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 bg-white rounded-full transition-transform ${
                  profile.notifications ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="p-6 text-right border-t bg-gray-50">
            <button
              onClick={handleSave}
              className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input({ label, value }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input
        value={value ?? ""}
        disabled
        className="w-full bg-gray-100 border rounded-lg p-2.5 cursor-not-allowed"
      />
    </div>
  );
}

export default Settings;
