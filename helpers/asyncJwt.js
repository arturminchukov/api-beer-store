const jwt = require('jsonwebtoken');

class AsyncJwt {
    createToken(payload, secretKey, expirationTime) {
        return new Promise((resolve, reject) => {
            jwt.sign(payload, secretKey, {expiresIn: expirationTime}, (error, token) => {
                if (error) {
                    reject(error);
                }

                resolve(token);
            });
        });
    }
}

module.exports = new AsyncJwt();
