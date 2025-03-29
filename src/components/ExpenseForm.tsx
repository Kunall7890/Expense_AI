
import React, { useState } from 'react';
import { useExpense } from '../contexts/ExpenseContext';
import { ExpenseCategory } from '../types/expense';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const categories: ExpenseCategory[] = [
  'food', 
  'transportation', 
  'entertainment', 
  'utilities', 
  'housing', 
  'shopping', 
  'health', 
  'education', 
  'travel', 
  'other'
];

const ExpenseForm: React.FC = () => {
  const { addExpense } = useExpense();
  const { toast } = useToast();
  
  const [amount, setAmount] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<ExpenseCategory>('other');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast({
        title: 'Invalid amount',
        description: 'Please enter a valid positive number',
        variant: 'destructive'
      });
      return;
    }
    
    if (!description.trim()) {
      toast({
        title: 'Missing description',
        description: 'Please enter a description',
        variant: 'destructive'
      });
      return;
    }
    
    const newExpense = {
      amount: Number(amount),
      description,
      category,
      date: new Date(date),
    };
    
    addExpense(newExpense);
    
    // Reset form
    setAmount('');
    setDescription('');
    setCategory('other');
    setDate(new Date().toISOString().split('T')[0]);
    
    toast({
      title: 'Expense added',
      description: `$${amount} for ${description}`,
    });
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow-sm border">
      <h2 className="text-lg font-semibold mb-2">Add New Expense</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="amount">Amount ($)</Label>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            min="0.01"
            step="0.01"
            className="w-full"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full"
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What did you spend on?"
          className="w-full"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select value={category} onValueChange={(value) => setCategory(value as ExpenseCategory)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <Button type="submit" className="w-full bg-chatbot-primary hover:bg-chatbot-secondary">
        Add Expense
      </Button>
    </form>
  );
};

export default ExpenseForm;
