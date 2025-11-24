/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState } from "react";

export const FlightContext = createContext();

export const FlightProvider = ({ children }) => {
  const [flights, setFlights] = useState([
    { id: 1, origin: "Lahore", destination: "Karachi", time: "2025-11-20 10:00", price: 15000 },
    { id: 2, origin: "Islamabad", destination: "Karachi", time: "2025-11-21 12:00", price: 14000 },
  ]);

  return (
    <FlightContext.Provider value={{ flights, setFlights }}>
      {children}
    </FlightContext.Provider>
  );
};
