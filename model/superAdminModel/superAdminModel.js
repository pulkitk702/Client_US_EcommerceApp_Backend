const db = require("../../db"); // Adjust based on your project structure

const assignStoreAdmin = async ({ created_by, user_id, store_id }) => {
  const result = await db.query(
    `
    INSERT INTO store_admin_maps (created_by, user_id, store_id)
    VALUES ($1, $2, $3)
    RETURNING *;
    `,
    [created_by, user_id, store_id]
  );

  return result.rows[0];
};

const createSuperAdmin = async (adminData) => {
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
      contact_number
    } = adminData;
  
    const result = await db.query(
      `INSERT INTO super_admins 
      (first_name, last_name, gender, age, address, city, country, zip_code, email, password, contact_number)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`,
      [first_name, last_name, gender, age, address, city, country, zip_code, email, password, contact_number]
    );
  
    return result.rows[0];
  };
  
  const getSuperAdminByEmail = async (email) => {
    const result = await db.query(`SELECT * FROM super_admins WHERE email = $1`, [email]);
    return result.rows[0];
  };

module.exports = {
  assignStoreAdmin,
  createSuperAdmin,
  getSuperAdminByEmail,
};
