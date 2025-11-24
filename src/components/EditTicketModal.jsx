// src/components/modals/EditTicketModal.jsx
import React from "react";

const EditTicketModal = ({ isOpen, onClose, users, flights, currentTicket, setCurrentTicket, onUpdate }) => {
  if (!isOpen || !currentTicket) return null;

  const updateCount = (field, delta) => {
    setCurrentTicket(prev => {
      const newValue = prev[field] + delta;
      if (field === "adultCount" && newValue < 1) return prev;
      if (field === "childCount" && newValue < 0) return prev;
      return { ...prev, [field]: newValue };
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl w-full max-w-sm shadow-2xl border border-gray-700">
        {/* Header */}
        <div className="p-5 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-yellow-400 text-center">Edit Ticket</h2>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">

          {/* User */}
          <div>
            <label className="block text-yellow-300 text-sm font-medium mb-1">User</label>
            <select
              value={currentTicket.userId}
              onChange={(e) => setCurrentTicket({ ...currentTicket, userId: Number(e.target.value) })}
              className="w-full p-3 bg-gray-700 rounded-lg text-white text-sm focus:ring-2 focus:ring-yellow-500 outline-none"
            >
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
          </div>

          {/* Flight */}
          <div>
            <label className="block text-yellow-300 text-sm font-medium mb-1">Flight</label>
            <select
              value={currentTicket.flightId}
              onChange={(e) => setCurrentTicket({ ...currentTicket, flightId: Number(e.target.value) })}
              className="w-full p-3 bg-gray-700 rounded-lg text-white text-sm focus:ring-2 focus:ring-yellow-500 outline-none"
            >
              {flights.map(flight => (
                <option key={flight.id} value={flight.id}>
                  {flight.origin} to {flight.destination}
                </option>
              ))}
            </select>
          </div>

          {/* Passengers */}
          <div>
            <label className="block text-yellow-300 text-sm font-medium mb-3">Passengers</label>

            <div className="space-y-3">
              {/* Adults */}
              <div className="flex items-center justify-between bg-gray-700 rounded-lg p-3">
                <span className="text-sm font-medium">Adults</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateCount("adultCount", -1)}
                    disabled={currentTicket.adultCount <= 1}
                    className={`w-9 h-9 rounded-full font-bold text-lg transition ${
                      currentTicket.adultCount <= 1
                        ? "bg-gray-600 opacity-50 cursor-not-allowed"
                        : "bg-red-600 hover:bg-red-700"
                    }`}
                  >−</button>
                  <span className="w-12 text-center font-bold text-yellow-400">
                    {currentTicket.adultCount}
                  </span>
                  <button
                    onClick={() => updateCount("adultCount", 1)}
                    className="w-9 h-9 bg-green-600 hover:bg-green-700 rounded-full font-bold text-lg transition"
                  >+</button>
                </div>
              </div>

              {/* Children */}
              <div className="flex items-center justify-between bg-gray-700 rounded-lg p-3">
                <span className="text-sm font-medium">Children</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateCount("childCount", -1)}
                    disabled={currentTicket.childCount <= 0}
                    className={`w-9 h-9 rounded-full font-bold text-lg transition ${
                      currentTicket.childCount <= 0
                        ? "bg-gray-600 opacity-50 cursor-not-allowed"
                        : "bg-red-600 hover:bg-red-700"
                    }`}
                  >−</button>
                  <span className="w-12 text-center font-bold text-yellow-400">
                    {currentTicket.childCount}
                  </span>
                  <button
                    onClick={() => updateCount("childCount", 1)}
                    className="w-9 h-9 bg-green-600 hover:bg-green-700 rounded-full font-bold text-lg transition"
                  >+</button>
                </div>
              </div>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-yellow-300 text-sm font-medium mb-1">Status</label>
            <select
              value={currentTicket.status}
              onChange={(e) => setCurrentTicket({ ...currentTicket, status: e.target.value })}
              className="w-full p-3Participants bg-gray-700 rounded-lg text-white text-sm focus:ring-2 focus:ring-yellow-500 outline-none"
            >
              <option>Confirmed</option>
              <option>Pending</option>
              <option>Cancelled</option>
            </select>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex gap-3 p-5 border-t border-gray-700">
          <button
            onClick={onUpdate}
            className="flex-1 bg-linear-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 py-3 rounded-lg font-bold text-sm transition shadow-md"
          >
            Update Ticket
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-600 hover:bg-gray-700 py-3 rounded-lg font-bold text-sm transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTicketModal;