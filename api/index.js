const api = require('express').Router();

api.use('/auth', require('./auth'));
api.use('/', require('./board'));

module.exports = api;