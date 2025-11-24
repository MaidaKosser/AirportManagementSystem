import React from "react";

const MyBookings = ({ tickets, currency }) => {
  return (
    <div className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">My Bookings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.length > 0 ? tickets.map(t => (
          <div key={t.id} className="bg-gray-800 p-4 rounded-xl shadow-lg hover:scale-105 transition-transform">
            <h3 className="text-xl font-semibold mb-2">Flight ID: {t.flightId}</h3>
            <p>Passengers: {t.passengerCount}</p>
            <p>Status: <span className={t.status==="Confirmed" ? "text-green-400" : "text-orange-400"}>{t.status}</span></p>
            <p>Price: {currency} {/* optional: you can calculate total here */}</p>
          </div>
        )) : <p className="text-gray-300">No bookings found.</p>}
      </div>
    </div>
  );
};

export default MyBookings;
