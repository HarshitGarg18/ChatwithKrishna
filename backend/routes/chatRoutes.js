const express = require('express');
const router = express.Router();
const { askKrishna, getChatHistory } = require('../controllers/chatController');
const { protect } = require('../middleware/authMiddleware');

// Dono routes ab "protect" honge
router.post('/ask', protect, askKrishna);
router.get('/history', protect, getChatHistory);

module.exports = router;