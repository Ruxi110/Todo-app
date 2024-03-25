const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("todo-app", "root", "", {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: true
    }
});



module.exports = sequelize;