import React, { createContext, useState, useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Current logged-in user
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null
  );

  // Users list (includes default admin)
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || [
      { id: 1, name: "Admin", email: "admin@gmail.com", password: "123456", role: "admin" }
    ]
  );

  // Save users & currentUser to localStorage
  useEffect(() => localStorage.setItem("users", JSON.stringify(users)), [users]);
  useEffect(() => localStorage.setItem("currentUser", JSON.stringify(currentUser)), [currentUser]);

  // Register new user
  const register = (email, password, name) => {
    // Prevent duplicate emails
    if (users.find(u => u.email === email)) return null;

    const newUser = { id: Date.now(), name, email, password, role: "user" };
    setUsers([...users, newUser]);
    return newUser; // return new user for confirmation
  };

  // Login user
  const login = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) setCurrentUser(user);
    return user; // null if not found
  };

  // Logout
  const logout = () => setCurrentUser(null);

  return (
    <AuthContext.Provider value={{ users, currentUser, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => React.useContext(AuthContext);
