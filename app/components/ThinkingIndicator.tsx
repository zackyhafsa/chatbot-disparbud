import React from 'react';

const ThinkingIndicator = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="bg-gray-200 rounded-full px-5 py-3">
        <div className="flex items-center justify-center space-x-1.5">
          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

export default ThinkingIndicator;
