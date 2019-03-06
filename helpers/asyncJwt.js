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

    verifyToken(token, secretKey) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, secretKey, (error, decoded) => {
                if (error) {
                    reject(error);
                }

                resolve(decoded);
            });
        });
    }
}

module.exports = new AsyncJwt();
