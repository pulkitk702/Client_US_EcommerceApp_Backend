const bcrypt =require("bcrypt")
const db = require("../../db");

const getAllUsers = async () => {
  const result = await db.query(`SELECT 
  users.*, 
  roles.roles AS role_name
FROM 
  users
JOIN user_roles_maps AS urm 
  ON urm.created_by = users.id
JOIN roles 
  ON roles.id = urm.role_id`);
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
    user_role // optional, e.g., 'admin', 'user'
  } = userData;

  const hashedPassword = await bcrypt.hash(password, 10);

  // Step 1: Insert into users table
  const userInsertQuery = `
    INSERT INTO users (
      first_name, last_name, gender, age,
      address, city, country, zip_code,
      email, password, contact_number
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
    RETURNING *;
  `;

  const values = [
    first_name, last_name, gender, age,
    address, city, country, zip_code,
    email, hashedPassword, contact_number
  ];

  const userResult = await db.query(userInsertQuery, values);
  const newUser = userResult.rows[0];

  // Step 2: Get role id
  const roleName = user_role || 'user'; // default to 'user' if empty

  const roleResult = await db.query(
    `SELECT id FROM roles WHERE roles = $1`,
    [roleName]
  );


  if (!roleResult.rows.length) {
    throw new Error(`Role '${roleName}' not found in roles table`);
  }

  const roleId = roleResult.rows[0].id;

  // Step 3: Insert mapping in user_roles_maps
  await db.query(
    `INSERT INTO user_roles_maps (created_by, role_id) VALUES ($1, $2)`,
    [newUser.id, roleId]
  );

  return newUser;
};

const getUserByEmail = async (email) => {
  const result = await db.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);
  return result.rows[0];
};

const getUserById = async (id) => {
  const result = await db.query(
    `SELECT id, first_name, last_name, email FROM users WHERE id = $1`,
    [id]
  );
  return result.rows[0];
};

module.exports = {
  getAllUsers,
  createUser,
  getUserByEmail,
  getUserById
};
