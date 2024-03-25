const todoModel = require("../models").todo;
const AppError = require('../appError');
const pagination = require('../helpers/pagination');


exports.createTodo = async (req, res) => {
    const todo = {
        title: req.body.title,
        description: req.body.description,
        userId: req.body.userId
    };

    try {
        if (!todo.title || todo.title.trim() === "") {
            throw new AppError("Todo title is required", 400);
        }

        const todoAdd = await todoModel.create(todo);
        res.status(201).send(todoAdd);
    } catch (error) {
        if (error instanceof AppError) {
            res.status(error.statusCode).send(error.message);
        } else 
            res.status(500).send('Internal Server Error');
    }
};

exports.getAllTodos = async (req, res) => {
    const { page, size, title } = req.query;
    const { limit, offset } = pagination.getPagination(page, size);
    const condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    try {
        const todosData = await todoModel.findAndCountAll({
            where: condition,
            limit,
            offset
        });

        if (!todosData || todosData.count === 0) {
            return res.status(200).send({
                message: "There are no todos at the moment 😊"
            });
        }

        const response = pagination.getPagingData(todosData, page, limit);
        res.status(200).send({
            message: 'OK',
            data: response
        });
    } catch (error) {
        res.status(500).send({
            message: "Some error occurred while retrieving todos."
        });
    }
};

exports.getTodoByID = async (req, res) => {
    try{
        const id = req.params.id;
        const todo = await todoModel.findByPk(id);
        if(todo === null) {
            throw new AppError("ID Not Found", 404);
        }
        else {
            res.status(200).send({
                message:'OK',
                rez: todo
            });
        }
    }
    catch(error)
    {
        if (error instanceof AppError) {
            res.status(error.statusCode).send(error.message);
        } else 
            res.status(500).send('Internal Server Error');
    }
};
    
exports.getAllTodoByID = async (req, res) => {
    try{
        const id = req.params.id;
        const todo = await todoModel.findAll({
            where: {
                    userId:id
            }
            });
        if(todo == null) {
            throw new AppError("ID Not Found", 404);
            //res.status(404).send({
              //  message:'Not Found'});
        }
        else {
            res.status(200).send({
                message:'OK',
                rez: todo
            });
        }
    }
    catch(error)
    {
        if (error instanceof AppError) {
            res.status(error.statusCode).send(error.message);
        } else 
            res.status(500).send('Internal Server Error');
    }
}
