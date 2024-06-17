import React, { createContext, useContext, useState } from 'react';
import { Expenses, Saving } from './types';

interface ExpenseContextProps {
  income: number;
  setIncome: React.Dispatch<React.SetStateAction<number>>;
  extraIncome: number;
  setExtraIncome: React.Dispatch<React.SetStateAction<number>>;
  fixedPercentage: number;
  setFixedPercentage: React.Dispatch<React.SetStateAction<number>>;
  variablePercentage: number;
  setVariablePercentage: React.Dispatch<React.SetStateAction<number>>;
  savingsPercentage: number;
  setSavingsPercentage: React.Dispatch<React.SetStateAction<number>>;
  expenses: Expenses;
  setExpenses: React.Dispatch<React.SetStateAction<Expenses>>;
  savings: Saving[];
  setSavings: React.Dispatch<React.SetStateAction<Saving[]>>;
}

const ExpenseContext = createContext<ExpenseContextProps | undefined>(undefined);

export const useExpenseContext = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpenseContext must be used within a ExpenseProvider');
  }
  return context;
};

export const ExpenseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [income, setIncome] = useState<number>(0);
  const [extraIncome, setExtraIncome] = useState<number>(0);
  const [fixedPercentage, setFixedPercentage] = useState<number>(50);
  const [variablePercentage, setVariablePercentage] = useState<number>(30);
  const [savingsPercentage, setSavingsPercentage] = useState<number>(20);
  const [expenses, setExpenses] = useState<Expenses>({ fixed: [], variable: [] });
  const [savings, setSavings] = useState<Saving[]>([]);

  return (
    <ExpenseContext.Provider
      value={{
        income,
        setIncome,
        extraIncome,
        setExtraIncome,
        fixedPercentage,
        setFixedPercentage,
        variablePercentage,
        setVariablePercentage,
        savingsPercentage,
        setSavingsPercentage,
        expenses,
        setExpenses,
        savings,
        setSavings,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
