// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import AddUserModal from "../components/AddUserModal";
import EditUserModal from "../components/EditUserModal";
import AddTicketModal from "../components/AddTicketModal";
import EditTicketModal from "../components/EditTicketModal";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true); // ← Loading state

  const flights = [
    { id: 1, origin: "Lahore", destination: "Karachi", time: "10:00 AM", price: 25000 },
    { id: 2, origin: "Karachi", destination: "Islamabad", time: "02:30 PM", price: 32000 },
    { id: 3, origin: "Islamabad", destination: "Quetta", time: "05:00 PM", price: 28000 },
  ];

  // Modal States
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isAddTicketOpen, setIsAddTicketOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [isEditTicketOpen, setIsEditTicketOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentTicket, setCurrentTicket] = useState(null);

  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [newTicket, setNewTicket] = useState({
    userId: "", flightId: "", adultCount: 1, childCount: 0, status: "Pending"
  });

  // Load from localStorage SAFELY
  useEffect(() => {
    try {
      const savedUsers = localStorage.getItem("adminUsers");
      const savedTickets = localStorage.getItem("adminTickets");

      if (savedUsers && savedUsers !== "undefined") {
        const parsed = JSON.parse(savedUsers);
        setUsers(Array.isArray(parsed) ? parsed : []);
      }
      if (savedTickets && savedTickets !== "undefined") {
        const parsed = JSON.parse(savedTickets);
        setTickets(Array.isArray(parsed) ? parsed : []);
      }
    } catch (error) {
      console.error("LocalStorage data corrupted:", error);
      localStorage.removeItem("adminUsers");
      localStorage.removeItem("adminTickets");
    } finally {
      setLoading(false);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!loading) {
      localStorage.setItem("adminUsers", JSON.stringify(users));
      localStorage.setItem("adminTickets", JSON.stringify(tickets));
    }
  }, [users, tickets, loading]);

  // Handlers (same)
  const handleAddUser = () => {
    if (!newUser.name.trim() || !newUser.email.trim()) return alert("Fill all fields!");
    setUsers(prev => [...prev, { id: Date.now(), name: newUser.name.trim(), email: newUser.email.trim() }]);
    setNewUser({ name: "", email: "" });
    setIsAddUserOpen(false);
  };

  const handleAddTicket = () => {
    if (!newTicket.userId || !newTicket.flightId) return alert("Select User & Flight!");

    const exists = tickets.some(t =>
      t.userId === Number(newTicket.userId) &&
      t.flightId === Number(newTicket.flightId) &&
      t.adultCount === Number(newTicket.adultCount) &&
      t.childCount === Number(newTicket.childCount)
    );

    if (exists) {
      alert("This user already has the same ticket!");
      return;
    }

    setTickets(prev => [...prev, {
      id: Date.now(),
      userId: Number(newTicket.userId),
      flightId: Number(newTicket.flightId),
      adultCount: Number(newTicket.adultCount),
      childCount: Number(newTicket.childCount),
      status: newTicket.status,
      bookedAt: new Date().toLocaleDateString()
    }]);

    setNewTicket({ userId: "", flightId: "", adultCount: 1, childCount: 0, status: "Pending" });
    setIsAddTicketOpen(false);
  };

  const handleDeleteUser = (id) => {
    if (confirm("Delete this user and all their tickets?")) {
      setUsers(prev => prev.filter(u => u.id !== id));
      setTickets(prev => prev.filter(t => t.userId !== id));
    }
  };

  const handleDeleteTicket = (id) => {
    if (confirm("Delete this ticket?")) {
      setTickets(prev => prev.filter(t => t.id !== id));
    }
  };

  const totalRevenue = tickets.reduce((sum, t) => {
    const flight = flights.find(f => f.id === t.flightId);
    return sum + (flight?.price || 0) * (t.adultCount + t.childCount * 0.5);
  }, 0);

  // Loading Screen
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-2xl font-semibold">Loading Admin Panel...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar user={{ name: "Admin" }} showHome={false} showMyBooking={false} showLogout={true} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-yellow-400">Admin Panel</h1>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => setIsAddUserOpen(true)} className="bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-lg font-medium text-sm">
              + Add User
            </button>
            <button onClick={() => setIsAddTicketOpen(true)} className="bg-purple-600 hover:bg-purple-700 px-5 py-2.5 rounded-lg font-medium text-sm">
              + Add Ticket
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-gray-800 p-5 rounded-xl border border-gray-700 text-center">
            <p className="text-gray-400 text-sm">Total Users</p>
            <p className="text-3xl font-bold text-yellow-400 mt-1">{users.length}</p>
          </div>
          <div className="bg-gray-800 p-5 rounded-xl border border-gray-700 text-center">
            <p className="text-gray-400 text-sm">Total Tickets</p>
            <p className="text-3xl font-bold text-yellow-400 mt-1">{tickets.length}</p>
          </div>
          <div className="bg-gray-800 p-5 rounded-xl border border-gray-700 text-center">
            <p className="text-gray-400 text-sm">Revenue</p>
            <p className="text-2xl font-bold text-yellow-400 mt-1">PKR {totalRevenue.toLocaleString()}</p>
          </div>
          <div className="bg-gray-800 p-5 rounded-xl border border-gray-700 text-center">
            <p className="text-gray-400 text-sm">Flights</p>
            <p className="text-3xl font-bold text-yellow-400 mt-1">{flights.length}</p>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-gray-800 rounded-xl overflow-hidden mb-8 border border-gray-700">
          <div className="p-5 border-b border-gray-700">
            <h2 className="text-xl font-semibold text-yellow-400">Manage Users</h2>
          </div>
          {users.length === 0 ? (
            <p className="text-center py-16 text-gray-500 text-lg">
              No users yet. Click "+ Add User" to get started!
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="text-left p-4 text-sm font-medium">Name</th>
                    <th className="text-left p-4 text-sm font-medium">Email</th>
                    <th className="text-left p-4 text-sm font-medium">Bookings</th>
                    <th className="text-right p-4 text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id} className="border-t border-gray-700 hover:bg-gray-700">
                      <td className="p-4">{user.name}</td>
                      <td className="p-4 text-gray-400">{user.email}</td>
                      <td className="p-4">{tickets.filter(t => t.userId === user.id).length}</td>
                      <td className="p-4 text-right">
                        <button onClick={() => { setCurrentUser(user); setIsEditUserOpen(true); }} className="text-yellow-400 hover:underline text-sm mr-4">Edit</button>
                        <button onClick={() => handleDeleteUser(user.id)} className="text-red-400 hover:underline text-sm">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Tickets Table */}
        <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
          <div className="p-5 border-b border-gray-700">
            <h2 className="text-xl font-semibold text-yellow-400">Manage Tickets</h2>
          </div>
          {tickets.length === 0 ? (
            <p className="text-center py-16 text-gray-500 text-lg">
              No tickets booked yet
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="text-left p-4 text-sm font-medium">User</th>
                    <th className="text-left p-4 text-sm font-medium">Route</th>
                    <th className="text-left p-4 text-sm font-medium">Passengers</th>
                    <th className="text-left p-4 text-sm font-medium">Price</th>
                    <th className="text-left p-4 text-sm font-medium">Status</th>
                    <th className="text-right p-4 text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map(ticket => {
                    const user = users.find(u => u.id === ticket.userId);
                    const flight = flights.find(f => f.id === ticket.flightId);
                    if (!user || !flight) return null;
                    const price = flight.price * (ticket.adultCount + ticket.childCount * 0.5);

                    return (
                      <tr key={ticket.id} className="border-t border-gray-700 hover:bg-gray-700">
                        <td className="p-4">{user.name}</td>
                        <td className="p-4 text-gray-400">{flight.origin} to {flight.destination}</td>
                        <td className="p-4">{ticket.adultCount}A, {ticket.childCount}C</td>
                        <td className="p-4 font-medium">PKR {price.toLocaleString()}</td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${ticket.status === "Confirmed" ? "bg-green-600" : "bg-yellow-600"}`}>
                            {ticket.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button onClick={() => { setCurrentTicket(ticket); setIsEditTicketOpen(true); }} className="text-yellow-400 hover:underline text-sm mr-4">Edit</button>
                          <button onClick={() => handleDeleteTicket(ticket.id)} className="text-red-400 hover:underline text-sm">Delete</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <AddUserModal isOpen={isAddUserOpen} onClose={() => setIsAddUserOpen(false)} newUser={newUser} setNewUser={setNewUser} onAdd={handleAddUser} />
      <EditUserModal isOpen={isEditUserOpen} onClose={() => { setIsEditUserOpen(false); setCurrentUser(null); }} currentUser={currentUser} setCurrentUser={setCurrentUser} onUpdate={() => { setUsers(prev => prev.map(u => u.id === currentUser.id ? currentUser : u)); setIsEditUserOpen(false); setCurrentUser(null); }} />
      <AddTicketModal isOpen={isAddTicketOpen} onClose={() => setIsAddTicketOpen(false)} users={users} flights={flights} newTicket={newTicket} setNewTicket={setNewTicket} onAdd={handleAddTicket} />
      <EditTicketModal isOpen={isEditTicketOpen} onClose={() => { setIsEditTicketOpen(false); setCurrentTicket(null); }} users={users} flights={flights} currentTicket={currentTicket} setCurrentTicket={setCurrentTicket} onUpdate={() => { setTickets(prev => prev.map(t => t.id === currentTicket.id ? currentTicket : t)); setIsEditTicketOpen(false); setCurrentTicket(null); }} />
    </div>
  );
}