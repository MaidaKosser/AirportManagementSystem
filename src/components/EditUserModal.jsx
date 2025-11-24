// src/components/modals/EditUserModal.jsx
import React from "react";

const EditUserModal = ({ isOpen, onClose, currentUser, setCurrentUser, onUpdate }) => {
  if (!isOpen || !currentUser) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl border border-gray-600">
        <h2 className="text-2xl font-bold text-yellow-400 mb-5">Edit User</h2>

        <div className="space-y-4">
          <input
            type="text"
            value={currentUser.name}
            onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
            className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-yellow-500 outline-none"
          />
          <input
            type="email"
            value={currentUser.email}
            onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
            className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-yellow-500 outline-none"
          />
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onUpdate}
            className="flex-1 bg-yellow-600 hover:bg-yellow-700 py-3 rounded-lg font-bold"
          >
            Update User
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-600 hover:bg-gray-700 py-3 rounded-lg font-bold"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;