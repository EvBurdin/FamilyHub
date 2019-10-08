const express = require('./server');
const server = require('http').createServer(express);
global.io = require('socket.io')(server);

global.io.on('connection', (socket) => {
  
  console.log('aaa');
  socket.on('asd', () => {
    socket.emit('request', 'wewewewe');
    console.log('fgh');
  });
});

server.listen(3000);
console.log('server listen on 3000');
