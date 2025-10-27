import React from "react";

const ThinkingIndicator = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="bg-green-100 rounded-2xl px-4 py-3">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-2.5 h-2.5 bg-green-600 rounded-full animate-pulse [animation-delay:-0.4s]"></div>
          <div className="w-2.5 h-2.5 bg-green-600 rounded-full animate-pulse [animation-delay:-0.2s]"></div>
          <div className="w-2.5 h-2.5 bg-green-600 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default ThinkingIndicator;
