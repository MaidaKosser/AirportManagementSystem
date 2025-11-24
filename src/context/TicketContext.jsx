/* eslint-disable react-refresh/only-export-components */
// src/context/TicketContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const TicketContext = createContext();

export const TicketProvider = ({ children }) => {
  const [tickets, setTickets] = useState(() => {
    // Load from localStorage only once on mount
    try {
      const saved = localStorage.getItem("tickets");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Failed to parse tickets from localStorage", error);
      return [];
    }
  });

  // Sync tickets to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tickets", JSON.stringify(tickets));
  }, [tickets]);

  // Optional: Helper to add a ticket (cleaner in components)
  const addTicket = (newTicket) => {
    setTickets(prev => [...prev, newTicket]);
  };

  const deleteTicket = (ticketId) => {
    setTickets(prev => prev.filter(t => t.id !== ticketId));
  };

  return (
    <TicketContext.Provider value={{ tickets, setTickets, addTicket, deleteTicket }}>
      {children}
    </TicketContext.Provider>
  );
};