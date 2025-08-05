const db = require("../../db");
const createRole = async ({ created_by, roles }) => {
  const result = await db.query(
    `INSERT INTO roles (created_by, roles) VALUES ($1, $2, $3) RETURNING *`,
    [created_by, roles]
  );
  return result.rows[0];
};

const getAllRoles = async () => {
  const result = await db.query(`SELECT * FROM roles`);
  return result.rows;
};

const getRoleById = async (id) => {
  const result = await db.query(`SELECT * FROM roles WHERE id = $1`, [id]);
  return result.rows[0];
};

const updateRole = async ({ id, roles }) => {
  const result = await db.query(
    `UPDATE roles SET roles = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *`,
    [roles, id]
  );
  return result.rows[0];
};

const deleteRole = async (id) => {
  await db.query(`DELETE FROM roles WHERE id = $1`, [id]);
};

module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
};
