const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/user.models');
const Admin = require('../models/admin.models');

const verifyUser = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }

    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        req.user = decoded.user;

        // Ensure the user still exists in the database
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized - Invalid token' });
        }

        next();
    } catch (error) {
        console.error(error.message);
        res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }
};

const verifyAdmin = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);

        req.user = decoded.user;

        // Ensure the admin still exists in the database
        const admin = await Admin.findById(req.user.id);

        if (!admin) {
            return res.status(401).json({ message: 'Unauthorized - Invalid token' });
        }

        next();
    } catch (error) {
        console.error("here", error.message);
        res.status(401).json({ message: 'Unauthorized3 - Invalid token' });
    }
};

module.exports = {
    verifyUser,
    verifyAdmin,
};
