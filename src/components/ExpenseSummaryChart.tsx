
import React, { useState } from 'react';
import { useExpense } from '../contexts/ExpenseContext';
import { ExpenseCategory } from '../types/expense';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Color palette for categories
const COLORS = {
  food: '#FF8042',
  transportation: '#0088FE',
  entertainment: '#FFBB28', 
  utilities: '#00C49F',
  housing: '#8884d8',
  shopping: '#e377c2',
  health: '#7ac142',
  education: '#7f7f7f',
  travel: '#17becf',
  other: '#9467bd'
};

type TimePeriod = 'week' | 'month' | 'year';

const ExpenseSummaryChart: React.FC = () => {
  const { expenses } = useExpense();
  const [period, setPeriod] = useState<TimePeriod>('month');
  
  // Calculate date ranges based on selected period
  const now = new Date();
  const getDateRange = () => {
    switch (period) {
      case 'week':
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - now.getDay());
        return { start: weekStart, end: now };
      case 'month':
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        return { start: monthStart, end: now };
      case 'year':
        const yearStart = new Date(now.getFullYear(), 0, 1);
        return { start: yearStart, end: now };
    }
  };
  
  const { start, end } = getDateRange();
  
  // Filter expenses for the selected period
  const filteredExpenses = expenses.filter(
    expense => expense.date >= start && expense.date <= end
  );
  
  // Aggregate expenses by category
  const categoryData = filteredExpenses.reduce<Record<ExpenseCategory, number>>((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<ExpenseCategory, number>);
  
  // Format data for the pie chart
  const chartData = Object.entries(categoryData)
    .filter(([_, amount]) => amount > 0) // Filter out zero amounts
    .map(([category, amount]) => ({
      name: category.charAt(0).toUpperCase() + category.slice(1),
      value: amount,
      category: category as ExpenseCategory
    }));
  
  // Calculate total amount
  const totalAmount = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Expense Breakdown</h2>
        <Select value={period} onValueChange={(value) => setPeriod(value as TimePeriod)}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {totalAmount > 0 ? (
        <div className="h-[300px] mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.category]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`$${Number(value).toFixed(2)}`, 'Amount']}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-[300px] flex items-center justify-center">
          <p className="text-gray-500">No expenses recorded for this period</p>
        </div>
      )}
      
      <div className="text-center">
        <p className="text-sm text-gray-500">
          Total: <span className="font-semibold">${totalAmount.toFixed(2)}</span>
        </p>
      </div>
    </div>
  );
};

export default ExpenseSummaryChart;
