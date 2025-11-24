// src/components/modals/AddUserModal.jsx
import React from "react";

const AddUserModal = ({ isOpen, onClose, newUser, setNewUser, onAdd }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl border border-gray-600">
        <h2 className="text-2xl font-bold text-yellow-400 mb-5">Add New User</h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-yellow-500 outline-none transition"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-yellow-500 outline-none transition"
          />
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onAdd}
            className="flex-1 bg-green-600 hover:bg-green-700 py-3 rounded-lg font-bold transition"
          >
            Add User
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-600 hover:bg-gray-700 py-3 rounded-lg font-bold transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;