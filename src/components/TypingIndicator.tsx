
import React from "react";

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-center space-x-1 bg-chatbot-light text-gray-800 rounded-2xl px-4 py-2 max-w-[80%] rounded-tl-none animate-bounce-in">
      <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
      <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
      <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
    </div>
  );
};

export default TypingIndicator;
