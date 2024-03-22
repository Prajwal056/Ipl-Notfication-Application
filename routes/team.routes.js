const express = require('express');
const router = express.Router();
const teamController = require('../controllers/team.controller');
const authMiddleware = require('../middlewares/authMiddleware');

// Team routes
router.post('/create', authMiddleware.verifyAdmin, teamController.createTeam);
// router.get('/all', teamController.getAllTeams);
// router.get('/:teamId', teamController.getTeamDetails);
router.put('/:teamId', authMiddleware.verifyAdmin, teamController.updateTeam);

module.exports = router;
