const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const userSchema = require('../schemas/user.schema');
const adminSchema = require('../schemas/admin.schemas');

const { validatePayload, verifyToken } = require('../middlewares/payloadValidator');

// User Authentication Routes
router.post('/user/register', validatePayload(userSchema.registerSchema), authController.registerUser);
router.post('/user/login', validatePayload(userSchema.loginSchema), authController.loginUser);
router.post('/user/logout', validatePayload(userSchema.loginSchema), authController.logoutUser);

// Admin Authentication Routes
router.post('/admin/register', validatePayload(adminSchema.registerSchema), authController.registerAdmin);
router.post('/admin/login', validatePayload(adminSchema.loginSchema), authController.loginAdmin);

module.exports = router;
