const {commentRouter} = require('./index');

const socketRouter = function (io) {
    io.on('connection', (socket) => {
        console.log('connect');

        commentRouter(socket);

        socket.on('disconnect', () => {
            console.log('disconnect');
        });
    });
};


module.exports = socketRouter;
