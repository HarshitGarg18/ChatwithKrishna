const mongoose = require('mongoose');
const chatSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId
    ,
     ref: 'User',
      required: true
     }, // Link to User
  prompt: String,
  response: String
}, { timestamps: true });
module.exports = mongoose.model('Chat', chatSchema);