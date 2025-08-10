const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");
const UserModel = require("../../model/userModel/userModel");
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.getUserByEmail(email); // You must create this function

    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user);
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
};

const getAllUser = async (_, res) => {
  try {
    const users = await UserModel.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).send("something went wrong while fetching the users");
  }
};

const createUser = async (req, res) => {
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
      user_role // optional, for auto role mapping
    } = req.body;

    if (!first_name || !email || !password) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const existingUser = await UserModel.getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" });
    }

    const newUser = await UserModel.createUser({
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
      user_role // pass optional role
    });

    res.status(200).json({ message: "User Created Successfully", user: newUser });

  } catch (error) {
    console.error("Create User Error:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

module.exports = {
  getAllUser,
  createUser,
  loginUser
};
