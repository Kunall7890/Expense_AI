
import React from 'react';
import { useExpense } from '../contexts/ExpenseContext';
import { AlertCircle, Info, CheckCircle } from 'lucide-react';

const InsightsList: React.FC = () => {
  const { getInsights } = useExpense();
  const insights = getInsights();
  
  if (insights.length === 0) {
    return null;
  }
  
  const getIcon = (type: 'warning' | 'info' | 'success') => {
    switch (type) {
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
  };
  
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border">
      <h2 className="text-lg font-semibold mb-3">AI Insights</h2>
      
      <div className="space-y-3">
        {insights.map((insight, index) => (
          <div 
            key={index}
            className="flex p-3 border rounded-md items-start gap-3"
          >
            <div className="shrink-0 mt-0.5">
              {getIcon(insight.type)}
            </div>
            <div>
              <h3 className="font-medium text-sm">{insight.title}</h3>
              <p className="text-sm text-gray-600">{insight.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsightsList;
