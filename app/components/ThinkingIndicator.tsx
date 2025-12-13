import React from "react";
import { Sparkles } from "lucide-react";

const ThinkingIndicator = () => {
  return (
    <div className="flex gap-3 my-4">
      <Sparkles
        size={30}
        className="text-green-800 shrink-0 mt-1 border border-green-600 rounded-full p-1 shadow-green-200 shadow-md"
      />
      <div className="flex items-center space-x-3">
        <div>
          <div className="flex items-center space-x-1.5">
            <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThinkingIndicator;
