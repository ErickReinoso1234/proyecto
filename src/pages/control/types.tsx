export interface Gasto {
  name: string;
  amount: number;
  date: string;
  type: 'Gasto Fijo' | 'Gasto Variable' | 'Ahorro';
}

export interface Gastos {
  fixed: Gasto[];
  variable: Gasto[];
}

export interface Ahorro {
  name: any;
  amount: number;
  date: string;
}
