
import React from "react";
import { Message } from "../types/chat";
import { getSentimentEmoji } from "../utils/sentimentAnalysis";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  return (
    <div
      className={cn(
        "flex w-full mb-4 animate-fade-in",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2",
          isUser
            ? "bg-chatbot-primary text-white rounded-tr-none"
            : "bg-chatbot-light text-gray-800 rounded-tl-none"
        )}
      >
        <div className="flex items-start">
          <div className="flex-1">
            <p className="text-sm sm:text-base">{message.text}</p>
            <p className="text-xs opacity-70 mt-1">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
          
          {isUser && message.sentiment && (
            <div className="ml-2 text-lg" title={`Sentiment: ${message.sentiment}`}>
              {getSentimentEmoji(message.sentiment)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
