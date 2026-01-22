import { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle, XCircle } from "lucide-react";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBookings(res.data);
    } catch (err) {
      console.error("Failed to fetch bookings", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500 font-bold">Loading bookings...</p>;
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-black text-gray-800">Bookings</h1>
        <p className="text-sm text-gray-500 mt-1">
          All hotel reservations
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-bold">
            <tr>
              <th className="px-6 py-4 text-left">Hotel</th>
              <th className="px-6 py-4 text-left">Guest</th>
              <th className="px-6 py-4">Dates</th>
              <th className="px-6 py-4">Nights</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <tr
                key={b.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4">
                  <p className="font-bold text-gray-800">{b.hotel_name}</p>
                  <p className="text-xs text-gray-500">{b.location}</p>
                </td>

                <td className="px-6 py-4">
                  <p className="font-semibold">
                    {b.first_name} {b.last_name}
                  </p>
                  <p className="text-xs text-gray-500">{b.email}</p>
                </td>

                <td className="px-6 py-4 text-center">
                  <p className="font-semibold">
                    {b.check_in} → {b.check_out}
                  </p>
                </td>

                <td className="px-6 py-4 text-center font-bold">
                  {b.nights}
                </td>

                <td className="px-6 py-4 text-center font-black text-slate-800">
                  €{b.total_price}
                </td>

                <td className="px-6 py-4 text-center">
                  {b.status === "confirmed" ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                      <CheckCircle size={14} /> Confirmed
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">
                      <XCircle size={14} /> Cancelled
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
