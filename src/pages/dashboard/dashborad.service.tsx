// services/ahorrosService.ts
import axios from 'axios';

const API_URL = 'http://localhost:4000/ahorros/'; // Reemplaza con la URL de tu API

export const getAhorros = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log(response.data); // Verifica los datos aquí
    return response.data;
  } catch (error) {
    console.error('Error fetching ahorros:', error);
    throw error;
  }
};
