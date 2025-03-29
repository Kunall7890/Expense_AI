
import React from "react";
import { Message, SentimentType } from "../types/chat";
import { Progress } from "@/components/ui/progress";

interface SentimentSummaryProps {
  messages: Message[];
}

const SentimentSummary: React.FC<SentimentSummaryProps> = ({ messages }) => {
  // Only analyze user messages
  const userMessages = messages.filter(msg => msg.sender === 'user' && msg.sentiment);
  
  if (userMessages.length === 0) {
    return null;
  }
  
  // Count sentiments
  const counts = {
    positive: userMessages.filter(msg => msg.sentiment === 'positive').length,
    neutral: userMessages.filter(msg => msg.sentiment === 'neutral').length,
    negative: userMessages.filter(msg => msg.sentiment === 'negative').length
  };
  
  // Calculate percentages
  const total = userMessages.length;
  const percentages = {
    positive: Math.round((counts.positive / total) * 100),
    neutral: Math.round((counts.neutral / total) * 100),
    negative: Math.round((counts.negative / total) * 100)
  };
  
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <h3 className="text-sm font-medium mb-3">Message Sentiment Analysis</h3>
      
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span>Positive 😊</span>
            <span>{percentages.positive}%</span>
          </div>
          <Progress value={percentages.positive} className="h-2 bg-gray-100">
            <div className="h-full bg-chatbot-positive rounded-full"></div>
          </Progress>
        </div>
        
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span>Neutral 😐</span>
            <span>{percentages.neutral}%</span>
          </div>
          <Progress value={percentages.neutral} className="h-2 bg-gray-100">
            <div className="h-full bg-chatbot-neutral rounded-full"></div>
          </Progress>
        </div>
        
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span>Negative 😞</span>
            <span>{percentages.negative}%</span>
          </div>
          <Progress value={percentages.negative} className="h-2 bg-gray-100">
            <div className="h-full bg-chatbot-negative rounded-full"></div>
          </Progress>
        </div>
      </div>
    </div>
  );
};

export default SentimentSummary;
