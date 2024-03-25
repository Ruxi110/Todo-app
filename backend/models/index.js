const { Sequelize } = require('sequelize');
const db = require('../config/database');

const todoModel = require('./todoModel')
const userModel = require('./userModel')

const todo = todoModel(db, Sequelize);
const user = userModel(db,Sequelize);

user.hasMany(todo);
todo.belongsTo(user);

module.exports = {
    connection: db,
    todo,
    user
};