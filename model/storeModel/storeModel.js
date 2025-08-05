const db = require("../../db"); 

const getAllStores = async () => {
  const result = await db.query("SELECT * FROM stores ORDER BY created_at DESC");
  return result.rows;
};

const getStoreById = async (id) => {
  const result = await db.query("SELECT * FROM stores WHERE id = $1", [id]);
  return result.rows[0];
};

const createStore = async (storeData) => {
  const {
    name,
    address,
    country,
    city,
    zip_code,
    contact_number,
  } = storeData;

  const result = await db.query(
    `INSERT INTO stores (
      name, address, country, city, zip_code, contact_number
    ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [name, address, country, city, zip_code, contact_number]
  );

  return result.rows[0];
};

const updateStore = async (id, storeData) => {
  const {
    name,
    address,
    country,
    city,
    zip_code,
    contact_number,
  } = storeData;

  const result = await db.query(
    `UPDATE stores
     SET name = $1,
         address = $2,
         country = $3,
         city = $4,
         zip_code = $5,
         contact_number = $6,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $7
     RETURNING *`,
    [name, address, country, city, zip_code, contact_number, id]
  );

  return result.rows[0];
};

const deleteStore = async (id) => {
  const result = await db.query("DELETE FROM stores WHERE id = $1 RETURNING *", [id]);
  return result.rows[0];
};

module.exports = {
  getAllStores,
  getStoreById,
  createStore,
  updateStore,
  deleteStore,
};
