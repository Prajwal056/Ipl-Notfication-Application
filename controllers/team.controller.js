const Team = require('../models/team.models');
const User = require('../models/user.models');
const config = require('../config');
const handler = require('../helpers/response.helpers');

const createTeam = async (req, res) => {
    try {
        if (!req.user.isAdmin) {
            return res.status(403).json({ message: 'Forbidden - Admin access required' });
        }

        const team = new Team(req.body);
        team.createdByAdmin = req.user.id;
        await team.save();

        config.socket.emit('teamCreated', `Team ${team.name} created Successfully`);

        res.json({ team });
    } catch (error) {
        handler.errorHandler(res, 500, 'Something went wrong', error.message, error);
    }
};


const getAllTeams = async (req, res) => {
    try {
        const teams = await Team.find();
        res.json({ teams });
    } catch (error) {
        handler.errorHandler(res, 500, 'Something went wrong', error.message, error);
    }
};

const getTeamDetails = async (req, res) => {
    try {
        const team = await Team.findById(req.params.teamId);
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }
        res.json({ team });
    } catch (error) {
        handler.errorHandler(res, 500, 'Something went wrong', error.message, error);
    }
};

const updateTeam = async (req, res) => {
    try {
        if (!req.user.isAdmin) {
            return res.status(403).json({ message: 'Forbidden - Admin access required' });
        }

        const team = await Team.findByIdAndUpdate(req.params.teamId, req.body, { new: true });
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }

        config.socket.emit('teamUpdated', { teamId: team._id, message: 'Team updated' });

        res.json({ team });
    } catch (error) {
        handler.errorHandler(res, 500, 'Something went wrong', error.message, error);
    }
};

const subscribeToTeam = async (req, res) => {
    try {

        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized - User not authenticated' });
        }

        const { teamId } = req.params;

        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }

        const user = await User.findById(req.user.id);

        if (user.subscriptions?.includes(teamId)) {
            return res.status(400).json({ message: 'User is already subscribed to this team' });
        }

        user.subscriptions.push(teamId);
        await user.save();

        res.json({ message: 'Successfully subscribed to the team' });
    } catch (error) {
        handler.errorHandler(res, 500, 'Something went wrong', error.message, error);
    }
};


module.exports = {
    createTeam,
    getAllTeams,
    getTeamDetails,
    updateTeam,
    subscribeToTeam
};
