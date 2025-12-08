import { useState } from "react";

const packingItems = {
  Beach: {
    Summer: [
      { name: "Swimsuit", icon: <span className="text-2xl">👙</span> },
      { name: "Sunglasses", icon: <span className="text-2xl">👓</span> },
      { name: "Sunscreen", icon: <span className="text-2xl">🧴</span> },
      { name: "Beach Towel", icon: <span className="text-2xl">🏖️</span> },
      { name: "Flip Flops", icon: <span className="text-2xl">🩴</span> },
      { name: "Drink", icon: <span className="text-2xl">🥤</span> },
    ],

    Winter: [
      { name: "T-Shirt", icon: <span className="text-2xl">👚</span> },
      { name: "Warm Swimwear", icon: <span className="text-2xl">🩱</span> },
      { name: "Sunglasses", icon: <span className="text-2xl">👓</span> },
      { name: "Beach Towel", icon: <span className="text-2xl">🏖️</span> },
    ],
  },
  Mountain: {
    Summer: [
      { name: "Hiking Boots", icon: <span className="text-2xl">🥾</span> },
      { name: "Backpack", icon: <span className="text-2xl">🎒</span> },
      { name: "Drink", icon: <span className="text-2xl">🥤</span> },
      { name: "Hat", icon: <span className="text-2xl">🧢</span> },
      { name: "Sunscreen", icon: <span className="text-2xl">🧴</span> },
    ],
    Winter: [
      { name: "Warm Jacket", icon: <span className="text-2xl">🧥</span> },
      { name: "Gloves", icon: <span className="text-2xl">🧤</span> },
      { name: "Hiking Boots", icon: <span className="text-2xl">🥾</span> },
      { name: "Thermal Socks", icon: <span className="text-2xl">🧦</span> },
      { name: "Scarf", icon: <span className="text-2xl">🧣</span> },
    ],
  },
  City: {
    Summer: [
      { name: "Comfortable Shoes", icon: <span className="text-2xl">👟</span> },
      { name: "Sunglasses", icon: <span className="text-2xl">👓</span> },
      { name: "Hat", icon: <span className="text-2xl">🧢</span> },
      { name: "T-Shirt", icon: <span className="text-2xl">👕</span> },
      { name: "Shorts", icon: <span className="text-2xl">🩳</span> },
      { name: "Camera", icon: <span className="text-2xl">📸</span> },
    ],
    Winter: [
      { name: "Warm Coat", icon: <span className="text-2xl">🧥</span> },
      { name: "Scarf", icon: <span className="text-2xl">🧣</span> },
      { name: "Gloves", icon: <span className="text-2xl">🧤</span> },
      { name: "Boots", icon: <span className="text-2xl">🥾</span> },
      { name: "Camera", icon: <span className="text-2xl">📸</span> },
    ],
  },
};

export default function PackingList() {
  const [season, setSeason] = useState("Summer");
  const [tripType, setTripType] = useState("Beach");

  const items = packingItems[tripType][season];

  return (
    <div className="min-h-screen flex items-center justify-center p-6 -mt-5">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-700 text-center">Packing List Generator</h1>

        <div className="flex flex-col sm:flex-row gap-6 mb-8 justify-center">
          <div className="flex flex-col w-full sm:w-1/2">
            <label className="mb-2 font-semibold text-gray-700">Trip Type</label>
            <select
              value={tripType}
              onChange={(e) => setTripType(e.target.value)}
              className="border-2 border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            >
              <option>Beach</option>
              <option>Mountain</option>
              <option>City</option>
            </select>
          </div>

          <div className="flex flex-col w-full sm:w-1/2">
            <label className="mb-2 font-semibold text-gray-700">Season</label>
            <select
              value={season}
              onChange={(e) => setSeason(e.target.value)}
              className="border-2 border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            >
              <option>Summer</option>
              <option>Winter</option>
            </select>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-600 text-center">Your Packing List</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="bg-gray-100 border border-gray-400 rounded-xl p-4 flex items-center gap-3 font-medium text-gray-700 shadow-sm hover:shadow-md transition"
              >
                <span className="text-2xl text-gray-700">{item.icon}</span>
                {item.name}
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-gray-500 mt-6 text-sm">
          Customize your packing list for a perfect trip!
        </p>
      </div>
    </div>
  );
}
