import { useState } from "react";

const packingItems = {
  Beach: {
    Summer: [
      { name: "Swimsuit", icon: "👙" },
      { name: "Sunglasses", icon: "👓" },
      { name: "Sunscreen", icon: "🧴" },
      { name: "Beach Towel", icon: "🏖️" },
      { name: "Flip Flops", icon: "🩴" },
      { name: "Drink", icon: "🥤" },
    ],
    Winter: [
      { name: "T-Shirt", icon: "👚" },
      { name: "Warm Swimwear", icon: "🩱" },
      { name: "Sunglasses", icon: "👓" },
      { name: "Beach Towel", icon: "🏖️" },
    ],
  },
  Mountain: {
    Summer: [
      { name: "Hiking Boots", icon: "🥾" },
      { name: "Backpack", icon: "🎒" },
      { name: "Drink", icon: "🥤" },
      { name: "Hat", icon: "🧢" },
      { name: "Sunscreen", icon: "🧴" },
    ],
    Winter: [
      { name: "Warm Jacket", icon: "🧥" },
      { name: "Gloves", icon: "🧤" },
      { name: "Hiking Boots", icon: "🥾" },
      { name: "Thermal Socks", icon: "🧦" },
      { name: "Scarf", icon: "🧣" },
    ],
  },
  City: {
    Summer: [
      { name: "Comfortable Shoes", icon: "👟" },
      { name: "Sunglasses", icon: "👓" },
      { name: "Hat", icon: "🧢" },
      { name: "T-Shirt", icon: "👕" },
      { name: "Shorts", icon: "🩳" },
      { name: "Camera", icon: "📸" },
    ],
    Winter: [
      { name: "Warm Coat", icon: "🧥" },
      { name: "Scarf", icon: "🧣" },
      { name: "Gloves", icon: "🧤" },
      { name: "Boots", icon: "🥾" },
      { name: "Camera", icon: "📸" },
    ],
  },
};

export default function PackingList() {
  const [season, setSeason] = useState("Summer");
  const [tripType, setTripType] = useState("Beach");

  const items = packingItems[tripType][season];

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#f9fafb] -mt-5">
      <div className="w-full max-w-2xl bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-gray-100 p-8 md:p-12">
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Packing List
          </h1>
          <p className="text-gray-400 mt-2 font-medium text-sm">
            Everything you need for your next adventure.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-5 mb-12">
          <div className="flex flex-col w-full">
            <label className="mb-2 ml-1 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
              Trip Type
            </label>
            <select
              value={tripType}
              onChange={(e) => setTripType(e.target.value)}
              className="bg-gray-50 border border-gray-200 text-gray-700 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-gray-100 focus:border-gray-400 transition-all cursor-pointer font-semibold text-sm"
            >
              <option>Beach</option>
              <option>Mountain</option>
              <option>City</option>
            </select>
          </div>

          <div className="flex flex-col w-full">
            <label className="mb-2 ml-1 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
              Season
            </label>
            <select
              value={season}
              onChange={(e) => setSeason(e.target.value)}
              className="bg-gray-50 border border-gray-200 text-gray-700 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-gray-100 focus:border-gray-400 transition-all cursor-pointer font-semibold text-sm"
            >
              <option>Summer</option>
              <option>Winter</option>
            </select>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-gray-50 pb-4">
            <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Essential Items</h2>
            <span className="text-xs font-bold text-gray-400">{items.length} items</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="group flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:border-gray-300 hover:shadow-md transition-all duration-300"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </span>
                <span className="font-bold text-gray-600 text-sm tracking-tight">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}