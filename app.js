'use strict';

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const { Server } = require('socket.io');

// Database imports
const schemaBase = require('./DB');
const config = require('./config');

const app = express();

app.use(bodyParser.json({ limit: '300mb' }));
app.use(bodyParser.urlencoded({ limit: '300mb', extended: true }));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(cors());

const init = async () => {
    // 1. Connect DB
    await schemaBase.connect(config.mongoUri);
    global.models = schemaBase.init();
    require('./routes')(app);
    const server = http.createServer(app);

    const io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    });
    global.io = io;
    io.on('connection', (socket) => {
        const userId = socket.handshake.query.userId;

        if (userId) {
            socket.join(userId);
            console.log(`User ${userId} is Online`);
        }

        socket.on('send_message', (data) => {
            socket.to(data.user).emit('receive_message', data);
        });

        socket.on('disconnect', () => {
            console.log(`User ${userId} Disconnected`);
        });
    });

    const port = process.env.PORT || 4030;
    server.listen(port, () => {
        console.log(`Server started on port ${port} 🚀`);
    });
};

init();
