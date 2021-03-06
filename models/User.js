module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        id: {
            field: 'id',
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        pw: {
            field: 'pw',
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            field: 'name',
            type: DataTypes.STRING,
            allowNull: false,
        },
        salt: {
            type: DataTypes.STRING,
        },
    }, {
        tableName: 'user',
        timestamps: false,
    });

    return User;
}