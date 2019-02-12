const server = require('./web/app');
const config = require('config');
const {port} = config.get('server');

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
