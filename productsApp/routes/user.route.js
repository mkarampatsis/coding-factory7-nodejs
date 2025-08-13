const express = require('express');
const router = express.Router();

const verifyToken = require("../middlewares/auth.middleware").verifyToken;
const verifyRoles = require("../middlewares/auth.middleware").verifyRoles;

const userController = require('../controllers/user.controller');

router.get('/', userController.findAll);
router.get('/:username',verifyToken, userController.findOne);
router.post('/', verifyToken, verifyRoles("ADMIN"), userController.create);
router.patch('/:username', verifyToken, verifyRoles("ADMIN"), userController.update);
router.delete('/:username', verifyToken, verifyRoles("ADMIN"), userController.delete);

router.get('/check_duplicate_email/:email', userController.checkDuplicateEmail);
router.post('/create', userController.create);

module.exports = router;