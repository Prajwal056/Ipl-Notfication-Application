require('dotenv').config();
const io = require('socket.io-client');
const socket = io('http://localhost:3000');

module.exports = {
    database: {
        url: process.env.MONGODB_URI,
    },
    jwtSecret: process.env.JWT_SECRET_TOKEN,
    socket
};
