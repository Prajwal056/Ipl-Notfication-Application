const express = require('express');
const http = require('http');
const config = require('./config');
const app = express();
const server = http.createServer(app);
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const configureSocket = require('./socketConfig');

app.use(express.static(__dirname));

const authRoutes = require('./routes/auth.routes');
const teamRoutes = require('./routes/team.routes');
const subscribeRoutes = require('./routes/subscribe.routes');
const authMiddleware = require('./middlewares/authMiddleware');

// Connect to MongoDB
mongoose.connect(config.database.url)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Authentication middleware
app.use('/teams', authMiddleware.verifyAdmin);
app.use('/subscribe', authMiddleware.verifyUser);

// Use your routes
app.use('/auth', authRoutes);
app.use('/teams', teamRoutes);
app.use('/subscribe', subscribeRoutes);

// Use the new socket configuration
const io = configureSocket(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
