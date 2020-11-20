const board = require('express').Router();
const boardCtrl = require('./board.Ctrl');
const auth = require('../../middleware/auth');

board.post('/board', auth, boardCtrl.Addboard);
board.delete('/board', auth, boardCtrl.Delboard);

module.exports = board;