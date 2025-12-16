import React from "react";

export default function Topbar({ email, pageTitle }) {
  return (
    <div className="bg-white border-b px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-gray-700">{pageTitle}</h1>
      <span className="text-gray-600">{email}</span>
    </div>
  );
}
