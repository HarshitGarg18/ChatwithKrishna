// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// }, { timestamps: true });

// // Password hashing before saving
// userSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 10);
// });

// module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose');

// Humne bcrypt ka import hata diya hai kyunki ab uski zaroorat nahi
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

// Password hashing wala 'pre-save' function poora hata diya gaya hai

module.exports = mongoose.model('User', userSchema);