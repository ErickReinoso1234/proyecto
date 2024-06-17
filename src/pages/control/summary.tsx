import React from 'react';
import { Expenses, Saving } from './types';

interface SummaryProps {
  fixedPercentage: number;
  variablePercentage: number;
  savingsPercentage: number;
  expenses: Expenses;
  savings: Saving[];
  income: number;
}

const Summary: React.FC<SummaryProps> = ({
  fixedPercentage,
  variablePercentage,
  savingsPercentage,
  expenses,
  savings,
  income,
}) => {
  const totalFixed = expenses.fixed.reduce((sum, expense) => sum + expense.amount, 0);
  const totalVariable = expenses.variable.reduce((sum, expense) => sum + expense.amount, 0);
  const totalSavings = savings.reduce((sum, saving) => sum + saving.amount, 0);

  return (
    <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)' }}>
      <h2>Resumen</h2>
      <p>Ingreso Total: ${income}</p>
      <p>Gastos Fijos: ${totalFixed} ({fixedPercentage}%)</p>
      <p>Gastos Variables: ${totalVariable} ({variablePercentage}%)</p>
      <p>Ahorros: ${totalSavings} ({savingsPercentage}%)</p>
      <p>Restante: ${income - totalFixed - totalVariable - totalSavings}</p>
    </div>
  );
};

export default Summary;
