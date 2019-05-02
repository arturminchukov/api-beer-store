const {commentRouter} = require('./routers');
const authenticate = require('./middlewares/socketAuthenticationMiddleware');

const socketRouter = function (io) {
    io.on('connection', async (socket) => {
        console.log('connect');
        const user = await authenticate(socket);

        if (user) {
            commentRouter(socket);
        }

        socket.on('disconnect', () => {
            console.log('disconnect');
        });
    });
};


module.exports = socketRouter;
