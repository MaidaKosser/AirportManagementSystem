import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import { FlightProvider } from "./context/FlightContext";
import { TicketProvider } from "./context/TicketContext";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
   <AuthProvider>
    <UserProvider>
      <FlightProvider>
        <TicketProvider>
          <App />
        </TicketProvider>
      </FlightProvider>
    </UserProvider>
   </AuthProvider>
  </BrowserRouter>
);
