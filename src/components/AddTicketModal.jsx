// src/components/modals/AddTicketModal.jsx
import React from "react";

const AddTicketModal = ({ isOpen, onClose, users, flights, newTicket, setNewTicket, onAdd }) => {
  if (!isOpen) return null;

  const updateCount = (field, delta) => {
    setNewTicket(prev => {
      const current = prev[field];
      const newValue = current + delta;

      // Validation: Adult minimum 1, Child minimum 0
      if (field === "adultCount" && newValue < 1) return prev;
      if (field === "childCount" && newValue < 0) return prev;

      return { ...prev, [field]: newValue };
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-2xl p-8 w-full max-w-lg mx-4 shadow-2xl border border-gray-600">
        <h2 className="text-3xl font-bold text-yellow-400 mb-8 text-center">Add New Ticket</h2>

        {/* User Select */}
        <div className="mb-6">
          <label className="block text-yellow-300 font-semibold mb-2">Select User</label>
          <select
            value={newTicket.userId}
            onChange={(e) => setNewTicket({ ...newTicket, userId: e.target.value })}
            className="w-full p-4 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value="">Choose User</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>
        </div>

        {/* Flight Select */}
        <div className="mb-6">
          <label className="block text-yellow-300 font-semibold mb-2">Select Flight</label>
          <select
            value={newTicket.flightId}
            onChange={(e) => setNewTicket({ ...newTicket, flightId: e.target.value })}
            className="w-full p-4 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value="">Choose Flight</option>
            {flights.map((flight) => (
              <option key={flight.id} value={flight.id}>
                {flight.origin} to {flight.destination} - ${flight.price}
              </option>
            ))}
          </select>
        </div>

        {/* Passengers - With + / - Buttons */}
        <div className="mb-8">
          <label className="block text-yellow-300 font-semibold mb-4">Passengers</label>

          {/* Adults */}
          <div className="flex items-center justify-between bg-gray-700 rounded-lg p-4 mb-4">
            <span className="text-lg font-medium">Adults</span>
            <div className="flex items-center gap-4">
              <button
                onClick={() => updateCount("adultCount", -1)}
                className="w-10 h-10 bg-red-600 hover:bg-red-700 rounded-full text-xl font-bold transition"
                disabled={newTicket.adultCount <= 1}
              >
                -
              </button>
              <span className="w-16 text-center text-2xl font-bold text-yellow-400">
                {newTicket.adultCount}
              </span>
              <button
                onClick={() => updateCount("adultCount", 1)}
                className="w-10 h-10 bg-green-600 hover:bg-green-700 rounded-full text-xl font-bold transition"
              >
                +
              </button>
            </div>
          </div>

          {/* Children */}
          <div className="flex items-center justify-between bg-gray-700 rounded-lg p-4">
            <span className="text-lg font-medium">Children</span>
            <div className="flex items-center gap-4">
              <button
                onClick={() => updateCount("childCount", -1)}
                className="w-10 h-10 bg-red-600 hover:bg-red-700 rounded-full text-xl font-bold transition"
                disabled={newTicket.childCount <= 0}
              >
                -
              </button>
              <span className="w-16 text-center text-2xl font-bold text-yellow-400">
                {newTicket.childCount}
              </span>
              <button
                onClick={() => updateCount("childCount", 1)}
                className="w-10 h-10 bg-green-600 hover:bg-green-700 rounded-full text-xl font-bold transition"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={onAdd}
            className="flex-1 bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 py-4 rounded-lg font-bold text-lg transition shadow-lg"
          >
            Add Ticket
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-600 hover:bg-gray-700 py-4 rounded-lg font-bold text-lg transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTicketModal;