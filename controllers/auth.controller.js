const User = require('../models/user.models');
const Admin = require('../models/admin.models');
const jwt = require('jsonwebtoken');
const config = require('../config');
require('dotenv').config();
const handler = require('../helpers/response.helpers');

const registerAdmin = async (req, res) => {
    try {
        const admin = new Admin(req.body);
        await admin.save();

        const token = jwt.sign({ user: { id: admin._id, isAdmin: true } }, process.env.JWT_SECRET_TOKEN);
        res.json({ token });
    } catch (error) {
        handler.errorHandler(res, 500, 'Something went wrong', error.message, error);
    }
};

const loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;

        const admin = await Admin.findOne({ username });

        if (!admin || admin.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ user: { id: admin._id, isAdmin: true } }, process.env.JWT_SECRET_TOKEN);
        res.json({ token });
    } catch (error) {
        handler.errorHandler(res, 500, 'Something went wrong', error.message, error);
    }
};

const registerUser = async (req, res) => {
    try {

        const user = new User(req.body);
        await user.save();

        const token = jwt.sign({ user: { id: user._id } }, config.jwtSecret);
        res.json({ token });
    } catch (error) {
        handler.errorHandler(res, 500, 'Something went wrong', error.message, error);
    }
};

const loginUser = async (req, res) => {
    try {

        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        user.socketId = req.body.socketId;

        config.socket.emit('userLogin', 'User Login Successful');

        const token = jwt.sign({ user: { id: user._id } }, config.jwtSecret);
        res.json({ token });
    } catch (error) {
        handler.errorHandler(res, 500, 'Something went wrong', error.message, error);
    }
};

const logoutUser = async (req, res) => {
    try {
        const { username } = req.body;
        const user = await User.findOne({ username });

        if (user) {
            user.socketId = null;
            await user.save();

            config.socket.emit('userLogout', { userId: user._id, username: user.username });

            res.json({ message: 'Logout successful' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        handler.errorHandler(res, 500, 'Something went wrong', error.message, error);
    }
};




module.exports = {
    registerAdmin, loginAdmin, registerUser, loginUser, logoutUser
}