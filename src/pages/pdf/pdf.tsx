import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

interface Gasto {
  nombre: string;
  cantidad: number;
  tipo: string;
  fecha: string;
}

interface Props {
  gastos: Gasto[];
}

const PDFGenerator: React.FC<Props> = ({ gastos }) => {
  const handleGenerarPDF = () => {
    const doc = new jsPDF();

  
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Historial de Gastos", 20, 20);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");


    const tableColumn = ["#", "Nombre", "Cantidad", "Tipo", "Fecha"];
    const tableRows: any[] = [];


    gastos.forEach((gasto, index) => {
      const gastoData = [
        index + 1,
        gasto.nombre,
        `$${gasto.cantidad.toFixed(2)}`,
        gasto.tipo,
        gasto.fecha,
      ];
      tableRows.push(gastoData);
    });

 
    (doc as any).autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      styles: { font: "helvetica", fontSize: 12 },
      headStyles: { fillColor: [22, 160, 133] },
      alternateRowStyles: { fillColor: [240, 240, 240] },
    });

    doc.save("historial_gastos.pdf");
  };

  return (
    <button className="btn btn-primary" onClick={handleGenerarPDF}>
      Generar PDF
    </button>
  );
};

export default PDFGenerator;
