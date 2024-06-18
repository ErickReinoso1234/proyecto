import React, { createContext, useContext, useState } from 'react';
import { Gastos, Ahorro } from './types';

interface ExpenseContextProps {
  ingreso: number;
  setIngreso: React.Dispatch<React.SetStateAction<number>>;
  extraIngreso: number;
  setExtraIngreso: React.Dispatch<React.SetStateAction<number>>;
  porcentajeFijo: number;
  setPorcentajeFijo: React.Dispatch<React.SetStateAction<number>>;
  porcentajeVariable: number;
  setPorcentajeVariable: React.Dispatch<React.SetStateAction<number>>;
  porcentajeAhorro: number;
  setPorcentajeAhorro: React.Dispatch<React.SetStateAction<number>>;
  gastos: Gastos;
  setGastos: React.Dispatch<React.SetStateAction<Gastos>>;
  ahorros: Ahorro[];
  setAhorros: React.Dispatch<React.SetStateAction<Ahorro[]>>;
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
  const [ingreso, setIngreso] = useState<number>(0);
  const [extraIngreso, setExtraIngreso] = useState<number>(0);
  const [porcentajeFijo, setPorcentajeFijo] = useState<number>(50);
  const [porcentajeVariable, setPorcentajeVariable] = useState<number>(30);
  const [porcentajeAhorro, setPorcentajeAhorro] = useState<number>(20);
  const [gastos, setGastos] = useState<Gastos>({ fixed: [], variable: [] });
  const [ahorros, setAhorros] = useState<Ahorro[]>([]);

  return (
    <ExpenseContext.Provider
      value={{
        ingreso,
        setIngreso,
        extraIngreso,
        setExtraIngreso,
        porcentajeFijo,
        setPorcentajeFijo,
        porcentajeVariable,
        setPorcentajeVariable,
        porcentajeAhorro,
        setPorcentajeAhorro,
        gastos,
        setGastos,
        ahorros,
        setAhorros,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
