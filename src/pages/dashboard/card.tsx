// components/card.tsx
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface MyCardProps {
  title: string;
  amount: number;
}

const MyCard: React.FC<MyCardProps> = ({ title, amount }) => {
  // Convertir amount a número
  const numericAmount = Number(amount);

  // Si la conversión falla, mostrar 0.00 por defecto
  const displayAmount = isNaN(numericAmount) ? 0 : numericAmount;

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ${displayAmount.toFixed(2)}  {/* Mostrar el número con 2 decimales */}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MyCard;
