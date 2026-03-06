const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// const register = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const user = await User.create({ name, email, password });
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
//     res.status(201).json({ token, user: { name: user.name, email: user.email } });
//   } catch (err) {
//     res.status(400).json({ message: "Registration failed", error: err.message });
//   }
// };
const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Password ko hash karne wali line hata di
    const newUser = new User({ name, email, password }); 
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(201).json({ token, user: { id: newUser._id, name, email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User nahi mila!" });

    // Direct string comparison (Bcrypt hata diya)
    if (user.password !== password) {
      return res.status(400).json({ message: "Galat Password, Parth!" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// const login = async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (user && (await bcrypt.compare(password, user.password))) {
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
//     res.json({ token, user: { name: user.name, email: user.email } });
//   } else {
//     res.status(401).json({ message: "Invalid email or password" });
//   }
// };

module.exports = { register, login };