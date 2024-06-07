import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface MyCardProps {
  title: string;
  amount: number;
}

const MyCard: React.FC<MyCardProps> = ({ title, amount }) => (
  <Card>
    <CardContent>
      <Typography variant="h5" component="div">
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        ${amount}
      </Typography>
    </CardContent>
  </Card>
);

export default MyCard;
