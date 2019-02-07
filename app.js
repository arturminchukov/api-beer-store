const configureServer = require('./web/server');
const {port} = require('./config/config');

const app = configureServer();

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
