import React, { useContext, useState} from "react";
import Navbar from "../components/Navbar";
import { UserContext } from "../context/UserContext";
import { FlightContext } from "../context/FlightContext";
import { TicketContext } from "../context/TicketContext";

const UserDashboard = () => {
  const { user } = useContext(UserContext);
  const { flights } = useContext(FlightContext);
  const { tickets, setTickets } = useContext(TicketContext); // get current tickets too

  const cities = ["Lahore", "Karachi", "Islamabad", "Quetta"];
  const [from, setFrom] = useState(cities[0]);
  const [to, setTo] = useState(cities[1]);
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [tripType, setTripType] = useState("roundtrip");
  const [passengers, setPassengers] = useState({ adult: 1, child: 0 });
  const [currency, setCurrency] = useState("PKR");
  const [filteredFlights, setFilteredFlights] = useState([]);

  const handlePassengerChange = (type, delta) => {
    setPassengers(prev => ({ ...prev, [type]: Math.max(prev[type] + delta, 0) }));
  };

  const handleSearch = () => {
    const results = flights.filter(f => f.origin === from && f.destination === to);
    setFilteredFlights(results);
    if (results.length === 0) alert("No flights available for this route.");
  };

  const convertPrice = (price) => {
    switch (currency) {
      case "USD":
        return (price / 350).toFixed(2);
      case "EUR":
        return (price / 380).toFixed(2);
      default:
        return price.toFixed(0);
    }
  };
 // UserDashboard.jsx (sirf handleBook function replace karo)

const handleBook = (flight) => {
  if (!user) {
    alert("Please login first!");
    return;
  }

  const adultCount = passengers.adult;
  const childCount = passengers.child;

  // Check if this exact ticket already exists for this user
  const isAlreadyBooked = tickets.some(ticket =>
    ticket.userId === user.id &&
    ticket.flightId === flight.id &&
    ticket.adultCount === adultCount &&
    ticket.childCount === childCount
  );

  if (isAlreadyBooked) {
    alert("You have already booked this flight with the same number of passengers!");
    return;
  }

  const totalPrice = adultCount * flight.price + childCount * flight.price * 0.5;

  const newTicket = {
    id: Date.now(),
    userId: user.id,
    flightId: flight.id,
    adultCount,
    childCount,
    totalPrice,
    status: "Confirmed",
    bookedAt: new Date().toLocaleDateString("en-GB"),
  };

  const updatedTickets = [...tickets, newTicket];
  setTickets(updatedTickets);
  localStorage.setItem("tickets", JSON.stringify(updatedTickets));

  alert(`Booked Successfully!\nFlight: ${flight.origin} to ${flight.destination}\nTotal: PKR ${totalPrice.toLocaleString()}`);
};
  return (
    <div className="relative flex flex-col items-center min-h-screen bg-gray-900 text-white overflow-x-hidden">
      <Navbar user={user} />

      <div className="w-full max-w-6xl mt-8 px-4">

        {/* Flight Booking Card */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-xl mb-10 border border-gray-700">
          <h2 className="text-2xl font-semibold mb-4 text-yellow-400">Book a Flight</h2>

          {/* Trip Type */}
          <div className="flex gap-6 mb-4">
            {["oneway", "roundtrip", "multicity"].map(type => (
              <label key={type} className="flex items-center gap-2 font-medium">
                <input
                  type="radio"
                  name="tripType"
                  value={type}
                  checked={tripType === type}
                  onChange={() => setTripType(type)}
                  className="accent-yellow-400"
                />
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </label>
            ))}
          </div>

          {/* Flight Form */}
          <div className="flex flex-wrap gap-4 mb-4">
            <select value={from} onChange={e => setFrom(e.target.value)} className={inputClass}>
              {cities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={to} onChange={e => setTo(e.target.value)} className={inputClass}>
              {cities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <input type="date" value={departureDate} onChange={e => setDepartureDate(e.target.value)} className={inputClass} />
            {tripType === "roundtrip" && <input type="date" value={returnDate} onChange={e => setReturnDate(e.target.value)} className={inputClass} />}
          </div>

          {/* Passengers */}
          <div className="flex gap-6 mb-4 flex-wrap">
            {["adult", "child"].map(p => (
              <div key={p} className="flex items-center gap-2">
                <span>{p.charAt(0).toUpperCase() + p.slice(1)}:</span>
                <button onClick={() => handlePassengerChange(p, -1)} className={passengerBtnClass}>-</button>
                <span>{passengers[p]}</span>
                <button onClick={() => handlePassengerChange(p, 1)} className={passengerBtnClass}>+</button>
              </div>
            ))}
          </div>

          {/* Currency & Search */}
          <div className="flex flex-wrap gap-4 items-center">
            <select value={currency} onChange={e => setCurrency(e.target.value)} className={inputClass}>
              <option value="PKR">PKR</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
            <button onClick={handleSearch} className={searchBtnClass}>Search Flights</button>
          </div>
        </div>

        {/* Available Flights */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-yellow-400">Available Flights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFlights.length > 0 ? filteredFlights.map(f => (
              <div key={f.id} className="bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-transform cursor-pointer border border-gray-700">
                <h3 className="text-xl font-semibold mb-2">{f.origin} to {f.destination}</h3>
                <p>Departure: {f.time}</p>
                <p>
                  Price: {currency} {convertPrice((passengers.adult * f.price) + (passengers.child * f.price * 0.5))}
                </p>
                <button onClick={() => handleBook(f)} className={bookBtnClass}>Book Now</button>
              </div>
            )) : <p className="text-gray-400">Search for flights above.</p>}
          </div>
        </div>

      </div>
    </div>
  );
};

const inputClass = "p-2 rounded-lg bg-gray-700 text-white border border-gray-600 flex-1 focus:outline-none focus:ring-2 focus:ring-yellow-400";
const passengerBtnClass = "px-3 py-1 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition";
const searchBtnClass = "px-4 py-2 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 transition";
const bookBtnClass = "mt-3 px-4 py-2 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition";

export default UserDashboard;