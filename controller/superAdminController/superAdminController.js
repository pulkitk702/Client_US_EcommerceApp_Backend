const storeAdminModel = require("../../model/storeModel/storeModel");
const superAdminModel = require("../../model/superAdminModel/superAdminModel");
const bcrypt=require("bcrypt")
const jwt=require('jsonwebtoken')
const assignStoreAdmin = async (req, res) => {
  try {
    const { created_by, user_id, store_id } = req.body;

    if (!created_by || !user_id || !store_id) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const data = await storeAdminModel.assignStoreAdmin({
      created_by,
      user_id,
      store_id,
    });

    return res.status(201).json({
      message: "Store admin assigned successfully",
      data,
    });
  } catch (error) {
    if (error.code === "23505") {
      return res
        .status(409)
        .json({ message: "User is already admin for this store" });
    }
    console.error("Store Admin Assignment Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const createSuperAdmin = async (req, res) => {
  try {
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
    } = req.body;

    const existingAdmin = await superAdminModel.getSuperAdminByEmail(email);
    if (existingAdmin) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await superAdminModel.createSuperAdmin({
      first_name,
      last_name,
      gender,
      age,
      address,
      city,
      country,
      zip_code,
      email,
      password: hashedPassword,
      contact_number,
    });

    res.status(201).json({ message: "Super Admin created", admin: newAdmin });
  } catch (err) {
    console.error("Error creating super admin:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const loginSuperAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await superAdminModel.getSuperAdminByEmail(email);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET_ADMIN,
      { expiresIn: "7d" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

module.exports = { assignStoreAdmin, createSuperAdmin, loginSuperAdmin };
