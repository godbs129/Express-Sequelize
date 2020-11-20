module.exports = (sequelize, DataTypes) => {
    const Board = sequelize.define('board', {
        idx: {
            field: 'idx',
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            field: 'title',
            type: DataTypes.STRING,
            allowNull: false,
        },
        board: {
            field: 'board',
            type: DataTypes.STRING,
            allowNull: false,
        },
        id: {
            field: 'id',
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
            }
        }
    }, {
        tableName: 'board',
        timestamps: false,
    });

    return Board;
}