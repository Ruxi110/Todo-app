
module.exports = (sequelize, DataTypes) => {
    const Todo = sequelize.define("todo", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    return Todo;
};