const express = require('express');
const router = express.Router();
const teamController = require('../controllers/team.controller');
const authMiddleware = require('../middlewares/authMiddleware');

// Team routes
router.post('/:teamId', teamController.subscribeToTeam);

module.exports = router;
