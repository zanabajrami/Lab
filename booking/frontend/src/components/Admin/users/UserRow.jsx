import React from "react";

export default function UserRow({ user, onDelete }) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-4 py-2">{user.id}</td>
      <td className="px-4 py-2">{user.role}</td>
      <td className="px-4 py-2">{user.first_name}</td>
      <td className="px-4 py-2">{user.last_name}</td>
      <td className="px-4 py-2">{user.email}</td>
      <td className="px-4 py-2">{new Date(user.created_at).toLocaleString()}</td>
      <td className="px-4 py-2">{new Date(user.updated_at).toLocaleString()}</td>
      <td className="px-4 py-2 flex gap-2 flex-wrap">
        <button
          className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          onClick={() => alert(`Edit user ${user.id}`)}
        >
          Edit
        </button>
        <button
          className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
          onClick={() => onDelete(user.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
