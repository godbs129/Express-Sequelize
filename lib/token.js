const jwt = require('jsonwebtoken');

const JWT_SECRET = require('./secret.json').secret;

exports.creteToken = async (id) => {
    const payload = {
        id,
    };

    const option = {
        expiresIn: '24h',
        issuer: 'haeyoon',
        subject: 'token',
    };

    return jwt.sign(payload, JWT_SECRET, option);
};

exports.verifyToken = async (token) => {
    return jwt.verify(token, JWT_SECRET);
}