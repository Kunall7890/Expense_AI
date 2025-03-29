
export type ExpenseCategory = 
  | 'food' 
  | 'transportation' 
  | 'entertainment' 
  | 'utilities' 
  | 'housing' 
  | 'shopping' 
  | 'health' 
  | 'education' 
  | 'travel' 
  | 'other';

export interface Expense {
  id: string;
  amount: number;
  description: string;
  category: ExpenseCategory;
  date: Date;
  tags?: string[];
}

export interface ExpenseSummary {
  totalAmount: number;
  categoryBreakdown: Record<ExpenseCategory, number>;
  periodStart: Date;
  periodEnd: Date;
}

export interface InsightData {
  title: string;
  description: string;
  type: 'warning' | 'info' | 'success';
}
