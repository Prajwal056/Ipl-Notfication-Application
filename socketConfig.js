const socketIO = require('socket.io');

function configureSocket(server) {
    const io = socketIO(server);

    io.on('connection', (socket) => {
        const originalConsoleLog = console.log;
        console.log = function () {
            const data = Array.from(arguments).map(arg => typeof arg === 'object' ? JSON.stringify(arg) : arg);
            socket.emit('consoleLog', data.join(' '));
            originalConsoleLog.apply(console, arguments);
        };

        socket.on('userLogin', async (user) => {
            try {
                console.log('User logged in:', user);
                io.emit('userLogin', user);
            } catch (error) {
                console.error('Error:', error.message);
            }
        });

        socket.on('userLogout', async (user) => {
            try {
                console.log('User logged out:', user);
                io.emit('userLogout', user);
            } catch (error) {
                console.error('Error:', error.message);
            }
        });

        socket.on('teamUpdated', async (team) => {
            try {
                console.log('Team updated:', team);
                io.emit('teamUpdated', team);
            } catch (error) {
                console.error('Error:', error.message);
            }
        });

        socket.on('disconnect', () => {
            console.log = originalConsoleLog;
            console.log('User disconnected');
        });
    });

    return io;
}

module.exports = configureSocket;
