const { PubSub } = require('@google-cloud/pubsub');

const express = require('express');
const socketIO = require('socket.io');
const cors = require('cors');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = socketIO(server, { cors: { origin: true, } });
require('dotenv').config();

app.use(cors({ origin: true, }));
app.use(express.json());

const pubsub = new PubSub({ projectId: process.env.PROJECT_ID });
const subscription = pubsub.subscription(process.env.SUBSCRIPTION);

function messageHandler(message) {
    if (JSON.parse(message.data.toString()).type != "CLIENT") return;

    io.emit('message-packet', JSON.parse(message.data.toString()));
    message.ack();
}

subscription.on('message', messageHandler);
server.listen(3000);