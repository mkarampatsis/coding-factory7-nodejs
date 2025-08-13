const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');

router.get('/google/callback', authController.googleLogin);
router.post('/login', authController.login);

module.exports = router;

