import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const cleanupDatabase = async () => {
  let connection;
  
  try {
    // Connect to the database
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    console.log(`🔍 Checking database ${process.env.DB_NAME} for unnecessary tables...`);

    // Check if page_views table exists
    const [tables] = await connection.execute(
      "SHOW TABLES LIKE 'page_views'"
    );

    if (tables.length > 0) {
      console.log('📊 Found page_views table - removing it...');
      await connection.execute('DROP TABLE page_views');
      console.log('✅ page_views table removed successfully');
    } else {
      console.log('✅ No page_views table found - database is clean');
    }

    // Show remaining tables
    const [remainingTables] = await connection.execute('SHOW TABLES');
    console.log('\n📋 Current tables in your database:');
    remainingTables.forEach(table => {
      const tableName = Object.values(table)[0];
      console.log(`  - ${tableName}`);
    });

    await connection.end();
    console.log('\n🎉 Database cleanup completed!');
    console.log('💡 Your portfolio backend now only has essential tables.');

  } catch (error) {
    console.error('❌ Cleanup failed:', error);
    if (connection) {
      await connection.end();
    }
    process.exit(1);
  }
};

cleanupDatabase();