import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

let connection;

export const connectDB = async () => {
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    
    console.log('MySQL Connected');
    return connection;
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
};

export const getConnection = () => {
  if (!connection) {
    throw new Error('Database not connected');
  }
  return connection;
};