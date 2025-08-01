const { Client } = require('pg');
require('dotenv').config()
const client = new Client({
  user: process.env.USETNAME,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT, 
});

client.connect()
  .then(() => console.log('🟢 Connected to PostgreSQL!'))
  .catch(err => console.error('🔴 Connection error:', err.stack));

module.exports = client;
