// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom"; // note: no BrowserRouter here
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import { TicketProvider } from "./context/TicketContext";
import { FlightProvider } from "./context/FlightContext";
import MyBooking from "./pages/MyBooking";

// Pages
import Splash from "./pages/Splash";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";

const App = () => {
  return (
    <AuthProvider>
      <FlightProvider>
        <TicketProvider>
          <UserProvider>
            <Routes>
              <Route path="/" element={<Splash />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/user" element={<UserDashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/mybooking" element={<MyBooking />} />
            </Routes>
          </UserProvider>
        </TicketProvider>
      </FlightProvider>
    </AuthProvider>
  );
};

export default App;
