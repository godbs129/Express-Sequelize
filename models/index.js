const Sequelize = require('sequelize');

const sequelize = new Sequelize('test', 'root', 'jhy040129', {
    host: 'localhost',
    dialect: 'mysql',

    define: {
        timestamps: false
    }
});

const UserA = require('./User');
const BoardA = require('./board');

module.exports = {
    User: UserA(sequelize, Sequelize),
    Board: BoardA(sequelize, Sequelize),
}

sequelize.sync().then(() => {
    console.log('\nDB 연결 성공\n---------------------');
}).catch((err) => {
    console.log(err.message);
})