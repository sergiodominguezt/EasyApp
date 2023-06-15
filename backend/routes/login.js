const express = require('express');
const login = require('../controllers/login')
const router = express.Router();
module.exports = router;

router.post('/login', login.loginUser);