const db = require("../../db");

const getAllUsers = async () => {
  const result = await db.query("SELECT * FROM users");
  return result.rows;
};
const createUser = async (userData) => {
  const {
    first_name,
    last_name,
    gender,
    age,
    address,
    city,
    country,
    zip_code,
    email,
    password,
    contact_number,
  } = userData;

  const query = `
      INSERT INTO users (
        first_name,
        last_name,
        gender,
        age,
        address,
        city,
        country,
        zip_code,
        email,
        password,
        contact_number
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *;
    `;

  const values = [
    first_name,
    last_name,
    gender,
    age,
    address,
    city,
    country,
    zip_code,
    email,
    password,
    contact_number,
  ];

  const result = await db.query(query, values);
  return result.rows[0];
};

module.exports = {
  getAllUsers,
  createUser,
};
