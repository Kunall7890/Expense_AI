
import React from "react";
import { MessageSquare } from "lucide-react";
import ChatContainer from "../components/ChatContainer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-chatbot-primary text-white py-4 px-6 shadow-md">
        <div className="container mx-auto flex items-center">
          <MessageSquare className="mr-2" />
          <h1 className="text-xl font-semibold">ChatMood</h1>
          <span className="ml-2 text-xs bg-chatbot-secondary px-2 py-0.5 rounded-full">
            Sentiment Analysis
          </span>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 container mx-auto p-4 md:p-6 flex flex-col md:flex-row gap-6">
        <div className="flex-1 bg-white rounded-lg shadow-sm overflow-hidden border flex flex-col h-[70vh] md:h-[80vh]">
          <ChatContainer />
        </div>
        
        <div className="w-full md:w-80 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-medium mb-3">About ChatMood</h2>
            <p className="text-gray-600 text-sm">
              ChatMood is an AI-powered chatbot that can analyze the sentiment of your messages. 
              Try expressing different emotions in your messages and see how the bot responds!
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-medium mb-3">How It Works</h2>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start">
                <span className="text-chatbot-positive mr-2">😊</span>
                <span>Positive messages are recognized as happy or satisfied</span>
              </li>
              <li className="flex items-start">
                <span className="text-chatbot-neutral mr-2">😐</span>
                <span>Neutral messages have no strong emotional tone</span>
              </li>
              <li className="flex items-start">
                <span className="text-chatbot-negative mr-2">😞</span>
                <span>Negative messages express frustration or disappointment</span>
              </li>
            </ul>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-4 px-6 border-t">
        <div className="container mx-auto text-center text-sm text-gray-500">
          ChatMood - AI-powered sentiment analysis chatbot
        </div>
      </footer>
    </div>
  );
};

export default Index;
