const { Server } = require('socket.io');
const http  = require('http');
const express = require('express');

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    },
});

const onlineUsers={}

const getRecieverSocketId=(receiverId)=>{
    return onlineUsers[receiverId]
}

io.on('connection', (socket) => {
    console.log('a user connected');

    const userId=socket.handshake.query.userId
    if(userId!="undefined")onlineUsers[userId]=socket.id

    io.emit('onlineUsers',Object.keys(onlineUsers))

    socket.on('disconnect', () => {
        console.log('user disconnected');
        delete onlineUsers[userId]
        io.emit('onlineUsers',Object.keys(onlineUsers))
    });
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
});

module.exports = {app,io,server,getRecieverSocketId}
