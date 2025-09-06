import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const createMinimalDatabase = async () => {
  let connection;
  
  try {
    // First, connect without database to create it
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });

    // Create database if it doesn't exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
    console.log(`Database ${process.env.DB_NAME} created or already exists`);
    
    // Close the connection
    await connection.end();

    // Now connect to the specific database
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    console.log(`Connected to database ${process.env.DB_NAME}`);

    // Create ONLY contacts table (essential for portfolio)
    const createContactsTable = `
      CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(200) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_email (email),
        INDEX idx_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `;

    await connection.execute(createContactsTable);
    console.log('✅ Contacts table created successfully');

    await connection.end();
    console.log('🎉 Minimal migration completed successfully');
    console.log('📧 Your portfolio can now receive contact form submissions!');

  } catch (error) {
    console.error('❌ Migration failed:', error);
    if (connection) {
      await connection.end();
    }
    process.exit(1);
  }
};

createMinimalDatabase();