const express = require('express');
const cors = require('cors');
const createLogRoutes = require('./routes/logs');


const rateLimit = require('express-rate-limit');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', 
    methods: ['GET', 'POST']
  }
});
const logRoutes = createLogRoutes(io); 
const PORT = 3000;

// Rate limiter
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 30,
  message: 'Too many requests, please try again later.',
});

app.use(limiter);
app.use(cors());
app.use(express.json());
app.use('/logs', logRoutes);

// Socket.IO listeners
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('send_log', (logData) => {
    console.log('Received log data:', logData);
    
    socket.broadcast.emit('new_log', logData);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});


server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
