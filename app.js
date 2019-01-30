const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const {db} = require('./db/Database');
const User = require('./db/User');

const app = express();

(async function () {
    await db.createConnection();
    const user = new User(db.user, db.password);


    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });

    app.get('/beer', async (req, res) => {
        const {id} = req.query;
        const result = await axios.get(`https://api.punkapi.com/v2/beers/${id}`);

        res.send(result.data);
    });

    app.get('/beers', async (req, res) => {
        const {page} = req.query;
        const perPage = req.query.per_page;
        const result = await axios.get(`https://api.punkapi.com/v2/beers?page=${page}&per_page=${perPage}`);
        const {data} = result;

        res.send(data);
    });

    app.get('/favorite', (req, res) => {
        const {page} = req.query;
        const perPage = req.query.per_page;
        const result = getFavoriteBeers(page, perPage);

        res.send(result);
    });

    app.post('/registration', async function (req, res) {
        const login = req.body.login;
        const password = req.body.password;
        const result = await user.addNewUser({login, password});

        res.send(result);
    });

    app.post('/login', async function (req, res) {
        const userName = req.body.user;
        const password = req.body.password;
        const data = await user.isFreeLogin(userName);

        res.end(String(data));
    });

    app.listen(3030, () => {
        console.log('Server listening on port 3030');
    });
}());
