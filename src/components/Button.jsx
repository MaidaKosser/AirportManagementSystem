import React from "react";

function Button({ text, onClick, color = "gold", type = "button", className = "" }) {
  const colors = {
    gold: "bg-yellow-400 hover:bg-yellow-500 text-black",
    black: "bg-black hover:bg-gray-900 text-yellow-400",
    gray: "bg-gray-600 hover:bg-gray-700 text-yellow-300",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${colors[color]} px-5 py-2.5 rounded-lg font-semibold shadow-[0_0_15px_rgba(255,215,0,0.4)] hover:shadow-[0_0_25px_rgba(255,215,0,0.6)] transition-all duration-300 ease-in-out ${className}`}
    >
      {text}
    </button>
  );
}

export default Button;
