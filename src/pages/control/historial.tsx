import { Gasto, Ahorro } from './types';
import { Table, Tag } from 'antd';

interface HistorialProps {
  expenses: Gasto[];
  ahorros: Ahorro[];
}

export function Historial({ expenses, ahorros: savings }: HistorialProps) {
  // Función para determinar el tipo de costo (fijo, variable o ahorro)
  const determineCostType = (item: Gasto | Ahorro): string => {
    if ('type' in item) {
      if (item.type === 'Gasto Fijo') {
        return 'Fijo';
      } else if (item.type === 'Gasto Variable') {
        return 'Variable';
      } else if (item.type === 'Ahorro') {
        return 'Ahorro';
      }
    }
    return ''; // Manejo de caso base si no hay tipo definido
  };

  // Mapear los gastos fijos y variables al historial con sus tipos correspondientes
  const enrichedData = [
    ...expenses.map((expense) => ({
      ...expense,
      costType: determineCostType(expense), // Determinar el tipo de costo
      id: `${expense.name}-${expense.amount}-${expense.date}`, // Generar un identificador único basado en nombre, monto y fecha
    })),
    ...savings.map((saving) => ({
      ...saving,
      costType: determineCostType(saving), // Determinar el tipo de costo
      id: `${saving.name}-${saving.amount}-${saving.date}`, // Generar un identificador único basado en nombre, monto y fecha
    })),
  ];

  // Columnas de la tabla
  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Monto',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `$ ${amount.toFixed(2)}`,
    },
    {
      title: 'Fecha',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Tipo',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <Tag color={type === 'Gasto Fijo' ? 'red' : type === 'Gasto Variable' ? 'orange' : 'blue'}>{type}</Tag>
      ),
    },
  ];

  return (
    <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)' }}>
      <h2>Historial</h2>
      <Table columns={columns} dataSource={enrichedData} rowKey="id" />
    </div>
  );
}
