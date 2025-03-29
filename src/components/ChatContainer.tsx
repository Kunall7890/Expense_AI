
import React, { useState, useEffect, useRef } from "react";
import { Message, SentimentType } from "../types/chat";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import SentimentSummary from "./SentimentSummary";
import { analyzeSentiment } from "../utils/sentimentAnalysis";
import { getBotResponse, getGreeting } from "../utils/botResponses";
import { v4 as uuidv4 } from "uuid";

const ChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Initialize chat with a greeting
  useEffect(() => {
    const greeting: Message = {
      id: uuidv4(),
      text: getGreeting(),
      sender: 'bot',
      timestamp: new Date()
    };
    
    setMessages([greeting]);
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Handle sending a message
  const handleSendMessage = (text: string) => {
    // Analyze sentiment
    const sentiment = analyzeSentiment(text);
    
    // Create user message
    const userMessage: Message = {
      id: uuidv4(),
      text,
      sender: 'user',
      timestamp: new Date(),
      sentiment
    };
    
    // Add user message to chat
    setMessages(prev => [...prev, userMessage]);
    
    // Simulate bot typing
    setIsTyping(true);
    
    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponse: Message = {
        id: uuidv4(),
        text: getBotResponse(sentiment),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setIsTyping(false);
      setMessages(prev => [...prev, botResponse]);
    }, 1500 + Math.random() * 1000); // Random delay between 1.5-2.5 seconds
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="space-y-4">
          {messages.map(message => (
            <ChatMessage key={message.id} message={message} />
          ))}
          
          {isTyping && <TypingIndicator />}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {messages.filter(msg => msg.sender === 'user').length > 0 && (
        <div className="px-4 py-2 border-t">
          <SentimentSummary messages={messages} />
        </div>
      )}
      
      <div className="border-t p-4">
        <ChatInput onSendMessage={handleSendMessage} isDisabled={isTyping} />
      </div>
    </div>
  );
};

export default ChatContainer;
