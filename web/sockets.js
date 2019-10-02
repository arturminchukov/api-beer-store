const sockets = require('socket.io');
const config = require('config');

const socketConfiguration = require('./socketConfiguration');


const SOCKET_PING_TIMEOUT = config.get('WEBSOCKET.PING_TIMEOUT');
const SOCKET_PING_INTERVAL = config.get('WEBSOCKET.PING_INTERVAL');
const SOCKET_COOKIE = config.get('WEBSOCKET.COOKIES');

const configureSockets = function (server) {
    const io = sockets(server, {
        path: '/websockets',
        pingInterval: SOCKET_PING_INTERVAL,
        pingTimeout: SOCKET_PING_TIMEOUT,
        cookie: SOCKET_COOKIE
    });

    socketConfiguration(io);
};

module.exports = configureSockets;
