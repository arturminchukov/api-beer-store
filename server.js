const config = require('config');

const server = require('./web/app');

const port = config.get('SERVER.PORT');

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
