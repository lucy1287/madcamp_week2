// routes/user.js
const express = require('express');
const router = express.Router();
const { createUser } = require('../controllers/user');

// 새로운 사용자 생성 라우트
router.post('/create', createUser);

module.exports = router;