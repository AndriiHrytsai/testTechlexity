const doom = require('../helpers/doom.helper');
const JWT = require('jsonwebtoken');

const auth = () => {
    return async (req, res, next) => {
        let bearerToken = req.headers.authorization;
        if (bearerToken === undefined) {
            return doom.error.tokenNotFound(res);
        }

        let token = bearerToken.split(" ");
        if (Array.isArray(token) && token.length === 2) {
            token = token[1];
        } else {
            return doom.error.tokenNotValid(res);
        }

        let decode;
        try {
            decode = JWT.verify(token, process.env.JWT_ACCESS_SECRET);
        } catch (e) {
            if (e.name === JWT.TokenExpiredError.name) {
                return doom.error.tokenExpired(res);
            } else {
                return doom.error.tokenNotValid(res);
            }
        }

        req.user = {};
        req.user.id = decode.sub;
        next();
    }
};

module.exports = {
    user: auth(),
};
