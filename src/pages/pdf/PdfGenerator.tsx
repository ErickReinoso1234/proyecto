import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import moment from 'moment';

interface PdfProps {
  historial: {
    id: number;
    name: string;
    amount: number;
    date: string;
    type: string;
  }[];
}

const PdfGenerator: React.FC<PdfProps> = ({ historial }) => {
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    const columns = ['Nombre', 'Monto', 'Fecha', 'Tipo'];
    const tableData = historial.map(item => [
      item.name,
      `$ ${item.amount.toFixed(2)}`,
      moment(item.date).format('DD/MM/YYYY'),
      item.type
    ]);

    doc.setFontSize(18);
    doc.text('Historial', 14, 15);

    doc.autoTable({
      head: [columns],
      body: tableData,
      startY: 20,
    });

    doc.save('historial.pdf');
  };

  return (
    <div style={{marginTop: '20px' }}>
      <button className="btn btn-primary" onClick={handleDownloadPDF} style={{ marginBottom: '20px' }}>
        Descargar Historial en PDF
      </button>
    </div>
  );
};

export default PdfGenerator;
