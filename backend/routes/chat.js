const express = require('express');
const router = express.Router();
const chatController = require('../controller/chat.Controller.js');

router.post('/ask', chatController.askQuestion);

module.exports = router;
