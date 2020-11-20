const auth = require('express').Router();
const authCtrl = require('./auth.Ctrl');

auth.post('/register', authCtrl.register);
auth.post('/login', authCtrl.login);

module.exports = auth;