// src/pages/MyBooking.jsx
import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { TicketContext } from "../context/TicketContext";
import { FlightContext } from "../context/FlightContext";
import Navbar from "../components/Navbar";

export default function MyBooking() {
  const { user } = useContext(UserContext);
  const { tickets = [] } = useContext(TicketContext);
  const { flights = [] } = useContext(FlightContext);

  // Sirf current login user ki tickets filter karo
  const myTickets = tickets.filter(ticket => ticket.userId === user?.id);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <h1 className="text-3xl">Please login to see your bookings</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar user={user} />

      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-yellow-400 mb-8 text-center">
          My Bookings
        </h1>

        {myTickets.length === 0 ? (
          <div className="text-center py-20 bg-gray-800 rounded-2xl">
            <p className="text-xl text-gray-400">No bookings yet. Go book a flight!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {myTickets.map(ticket => {
              const flight = flights.find(f => f.id === ticket.flightId);
              if (!flight) return null;

              return (
                <div key={ticket.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-yellow-400 transition">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h3 className="text-2xl font-bold text-yellow-400">
                        {flight.origin} to {flight.destination}
                      </h3>
                      <p className="text-gray-300 mt-1">Date: {ticket.bookedAt}</p>
                      <p className="text-gray-400">Passengers: {ticket.adultCount} Adult, {ticket.childCount} Child</p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-green-400">
                        PKR {ticket.totalPrice.toLocaleString()}
                      </p>
                      <span className="inline-block mt-2 px-4 py-1 bg-green-600 rounded-full text-sm font-medium">
                        {ticket.status}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-700 text-sm text-gray-500">
                    Ticket ID: {ticket.id}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}