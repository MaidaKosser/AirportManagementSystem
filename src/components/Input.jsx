import React from "react";

export default function Input({ label, name, type = "text", value, onChange, placeholder }) {
  return (
    <div className="flex flex-col mb-4">
      {label && (
        <label
          htmlFor={name}
          className="text-yellow-400 font-medium mb-2 tracking-wide"
        >
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-gray-800 text-yellow-200 border border-gray-700 placeholder-yellow-400 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-200"
      />
    </div>
  );
}

