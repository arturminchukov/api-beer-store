const config = require('config');

const app = require('./web/app');
const configureWebsockets = require('./web/sockets');

const server = require('http')
    .createServer(app);

configureWebsockets(server);

const port = config.get('SERVER.PORT');

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
