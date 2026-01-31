import React, { useEffect, useState } from "react";

function CancelBookings() {
  const [cancellations, setCancellations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCancellations = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No auth token found. Please login as admin.");
          setLoading(false);
          return;
        }

        const res = await fetch("http://localhost:8000/api/cancel-bookings", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          const text = await res.text(); // merr text në rast gabimi (HTML)
          throw new Error(`Server error: ${text}`);
        }

        const data = await res.json();
        setCancellations(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCancellations();
  }, []);

  if (loading) return <p className="text-gray-400">Loading cancellations...</p>;
  if (error) return <p className="text-red-500 font-bold">{error}</p>;
  if (!cancellations.length) return <p className="text-gray-400">No cancellation requests found.</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-indigo-300">All Canceled Bookings</h2>
      <div className="overflow-x-auto border border-gray-300 rounded-lg shadow-sm">
        <table className="min-w-full border-collapse text-left">
          <thead className="bg-gray-100">
            <tr>
              {["ID","Booking ID","Name","Email","Hotel","Location","Check-in","Check-out","Reason","Status"].map((th) => (
                <th key={th} className="px-4 py-2 border-b text-sm font-semibold text-gray-700">{th}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cancellations.map((c) => (
              <tr key={c.id} className="even:bg-gray-50 hover:bg-gray-100 transition-colors">
                <td className="px-4 py-2 border">{c.id}</td>
                <td className="px-4 py-2 border">{c.booking_id}</td>
                <td className="px-4 py-2 border">{c.name}</td>
                <td className="px-4 py-2 border">{c.email}</td>
                <td className="px-4 py-2 border">{c.hotel_name}</td>
                <td className="px-4 py-2 border">{c.location}</td>
                <td className="px-4 py-2 border">{new Date(c.check_in).toLocaleDateString()}</td>
                <td className="px-4 py-2 border">{new Date(c.check_out).toLocaleDateString()}</td>
                <td className="px-4 py-2 border">{c.reason}</td>
                <td className={`px-4 py-2 border font-bold ${c.status === "approved" ? "text-green-600" : c.status === "rejected" ? "text-red-600" : "text-yellow-600"}`}>
                  {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CancelBookings;
