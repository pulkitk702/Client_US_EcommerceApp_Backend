const RoleModel = require("../../model/rolesModel/rolesModel");

const createRole = async (req, res) => {
  try {
    const { created_by, roles } = req.body;
    const role = await RoleModel.createRole({ created_by, roles });
    res.status(201).json(role);
  } catch (err) {
    res.status(500).json({ error: "Failed to create role" });
  }
};

const getAllRoles = async (_, res) => {
  try {
    const roles = await RoleModel.getAllRoles();
    res.json(roles);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch roles" });
  }
};

const getRoleById = async (req, res) => {
  try {
    const role = await RoleModel.getRoleById(req.params.id);
    if (!role) return res.status(404).json({ error: "Role not found" });
    res.json(role);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch role" });
  }
};

const updateRole = async (req, res) => {
  try {
    const role = await RoleModel.updateRole({ id: req.params.id, roles: req.body.roles });
    res.json(role);
  } catch (err) {
    res.status(500).json({ error: "Failed to update role" });
  }
};

const deleteRole = async (req, res) => {
  try {
    await RoleModel.deleteRole(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Failed to delete role" });
  }
};

module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
};
