import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../index.css';

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/login"), 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="relative flex flex-col items-center justify-center h-screen overflow-hidden bg-linear-to-b from-black via-gray-900 to-black text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.15),transparent_70%)]" />
      <img
        src="/splash.png"
        alt="Aurelia Air"
        className="w-40 h-40 mb-6 animate-float drop-shadow-[0_0_20px_rgba(255,215,0,0.5)]"/>
        <h1 className="text-5xl font-bold tracking-wide text-center text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-amber-600">
          Aurelia Air</h1>
      <p className="text-lg mt-3 text-gray-300 italic">Fly Beyond Luxury</p>
    </div>
  );
};

export default Splash;
