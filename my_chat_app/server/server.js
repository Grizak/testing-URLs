const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '..', 'public')));

// Socket.IO connection event
io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for chat messages from clients
    socket.on('chat message', (msg) => {
        // Broadcast message to all connected clients
        io.emit('chat message', msg);
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
