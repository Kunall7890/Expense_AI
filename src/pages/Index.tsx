
import React from "react";
import { CreditCard, PieChart, Zap } from "lucide-react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import ExpenseSummaryChart from "../components/ExpenseSummaryChart";
import InsightsList from "../components/InsightsList";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-chatbot-primary text-white py-4 px-6 shadow-md">
        <div className="container mx-auto flex items-center">
          <CreditCard className="mr-2" />
          <h1 className="text-xl font-semibold">ExpenseAI</h1>
          <span className="ml-2 text-xs bg-chatbot-secondary px-2 py-0.5 rounded-full">
            Smart Expense Tracker
          </span>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 container mx-auto p-4 md:p-6 flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-6">
          <ExpenseForm />
          <ExpenseList />
        </div>
        
        <div className="w-full md:w-80 space-y-6">
          <ExpenseSummaryChart />
          <InsightsList />
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-start gap-3 mb-3">
              <Zap className="h-5 w-5 text-purple-500" />
              <h2 className="text-lg font-medium">AI-Powered Insights</h2>
            </div>
            <p className="text-sm text-gray-600">
              ExpenseAI analyzes your spending patterns to provide personalized insights 
              and recommendations to help you manage your finances better.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-start gap-3 mb-3">
              <PieChart className="h-5 w-5 text-blue-500" />
              <h2 className="text-lg font-medium">Spending Visualization</h2>
            </div>
            <p className="text-sm text-gray-600">
              Track where your money goes with clear, interactive charts. 
              Gain visibility into your spending habits across different categories.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-4 px-6 border-t">
        <div className="container mx-auto text-center text-sm text-gray-500">
          ExpenseAI - Smart expense tracking with AI insights
        </div>
      </footer>
    </div>
  );
};

export default Index;
