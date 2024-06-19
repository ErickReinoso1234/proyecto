import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Tag, message } from 'antd';
import moment from 'moment';
import PdfGenerator from '../pdf/PdfGenerator';



interface HistorialItem {
  id: number;
  name: string;
  amount: number;
  date: string;
  type: string; // 'Gasto Fijo', 'Gasto Variable' o 'Ahorro'
}

export function Historial() {
  const [historial, setHistorial] = useState<HistorialItem[]>([]);

  useEffect(() => {
    fetchHistorial();
  }, []);

  const fetchHistorial = async () => {
    try {
      const response = await axios.get('http://localhost:4000/historial');
      const data = response.data.map((item: HistorialItem, index: number) => ({
        ...item,
        uniqueId: `${item.type}-${item.id}-${index}` // Crear un id único
      }));
      setHistorial(data);
    } catch (error) {
      console.error('Error fetching historial:', error);
      message.error('Error al obtener el historial.'); // Muestra un mensaje de error al usuario
    }
  };

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
      render: (amount: number) => {
        if (typeof amount !== 'number' || isNaN(amount)) {
          return 'N/A';
        }
        return `$ ${amount.toFixed(2)}`;
      },
    },
    {
      title: 'Fecha',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => moment(date).format('DD/MM/YYYY'), 
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
    <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)' }}>
      <h2>Historial</h2>
    
      <Table
        columns={columns}
        dataSource={historial}
        rowKey="uniqueId"
      />
      <PdfGenerator historial={historial} />
    </div>
  );
}