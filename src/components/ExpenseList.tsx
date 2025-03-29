
import React from 'react';
import { useExpense } from '../contexts/ExpenseContext';
import { Expense } from '../types/expense';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

const ExpenseList: React.FC = () => {
  const { expenses, deleteExpense } = useExpense();
  
  // Sort expenses by date (newest first)
  const sortedExpenses = [...expenses].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  if (sortedExpenses.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No expenses recorded yet.</p>
        <p className="text-sm">Add your first expense using the form above.</p>
      </div>
    );
  }
  
  return (
    <div className="overflow-x-auto rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedExpenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell>
                {expense.date.toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </TableCell>
              <TableCell className="font-medium">{expense.description}</TableCell>
              <TableCell>
                <span className="inline-block px-2 py-1 bg-gray-100 rounded-full text-xs capitalize">
                  {expense.category}
                </span>
              </TableCell>
              <TableCell className="text-right font-mono">
                ${expense.amount.toFixed(2)}
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteExpense(expense.id)}
                  aria-label="Delete expense"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ExpenseList;
