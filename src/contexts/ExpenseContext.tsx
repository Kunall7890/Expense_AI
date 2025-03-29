
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Expense, ExpenseCategory, ExpenseSummary, InsightData } from '../types/expense';
import { v4 as uuidv4 } from 'uuid';

interface ExpenseContextType {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (id: string, expense: Partial<Omit<Expense, 'id'>>) => void;
  getSummary: (startDate: Date, endDate: Date) => ExpenseSummary;
  getInsights: () => InsightData[];
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

// Helper function to load expenses from localStorage
const loadExpenses = (): Expense[] => {
  const saved = localStorage.getItem('expenses');
  if (saved) {
    try {
      return JSON.parse(saved, (key, value) => {
        if (key === 'date') return new Date(value);
        return value;
      });
    } catch (e) {
      console.error('Failed to parse expenses from localStorage', e);
      return [];
    }
  }
  return [];
};

export const ExpenseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>(loadExpenses);

  // Save expenses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...expense,
      id: uuidv4()
    };
    setExpenses(prev => [...prev, newExpense]);
  };

  const deleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  const updateExpense = (id: string, updatedExpenseData: Partial<Omit<Expense, 'id'>>) => {
    setExpenses(prev => 
      prev.map(expense => 
        expense.id === id ? { ...expense, ...updatedExpenseData } : expense
      )
    );
  };

  const getSummary = (startDate: Date, endDate: Date): ExpenseSummary => {
    const filteredExpenses = expenses.filter(
      expense => expense.date >= startDate && expense.date <= endDate
    );

    const totalAmount = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    
    const categoryBreakdown = filteredExpenses.reduce((breakdown, expense) => {
      const category = expense.category;
      breakdown[category] = (breakdown[category] || 0) + expense.amount;
      return breakdown;
    }, {} as Record<ExpenseCategory, number>);

    return {
      totalAmount,
      categoryBreakdown,
      periodStart: startDate,
      periodEnd: endDate
    };
  };

  const getInsights = (): InsightData[] => {
    const insights: InsightData[] = [];
    
    // Example insights based on spending patterns
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    
    const currentMonthSummary = getSummary(firstDayOfMonth, lastDayOfMonth);
    
    // High spending in a category
    const highestCategory = Object.entries(currentMonthSummary.categoryBreakdown)
      .sort(([, a], [, b]) => b - a)[0];
      
    if (highestCategory && highestCategory[1] > currentMonthSummary.totalAmount * 0.4) {
      insights.push({
        title: `High spending in ${highestCategory[0]}`,
        description: `${Math.round(highestCategory[1] / currentMonthSummary.totalAmount * 100)}% of your monthly spending is in this category.`,
        type: 'warning'
      });
    }
    
    // Month-to-month comparison
    const prevMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const prevMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
    const prevMonthSummary = getSummary(prevMonthStart, prevMonthEnd);
    
    if (currentMonthSummary.totalAmount > prevMonthSummary.totalAmount * 1.2) {
      insights.push({
        title: 'Spending increased',
        description: 'Your spending this month is 20% higher than last month.',
        type: 'warning'
      });
    } else if (prevMonthSummary.totalAmount > 0 && currentMonthSummary.totalAmount < prevMonthSummary.totalAmount * 0.8) {
      insights.push({
        title: 'Spending decreased',
        description: 'Great job! Your spending this month is at least 20% lower than last month.',
        type: 'success'
      });
    }
    
    return insights;
  };

  return (
    <ExpenseContext.Provider 
      value={{ 
        expenses, 
        addExpense, 
        deleteExpense, 
        updateExpense, 
        getSummary,
        getInsights
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpense = () => {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error('useExpense must be used within an ExpenseProvider');
  }
  return context;
};
