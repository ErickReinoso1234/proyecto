export interface Expense {
  name: string;
  amount: number;
  date: string;
  type: 'Gasto Fijo' | 'Gasto Variable' | 'Ahorro';
}

export interface Expenses {
  fixed: Expense[];
  variable: Expense[];
}

export interface Saving {
  name: any;
  amount: number;
  date: string;
}
