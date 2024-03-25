const express = require('express');
const router = express.Router();

const { todoController, userController } = require('../controllers');
const verifyToken = require('../middleware/authMiddleware');

router.post('/createToDo', verifyToken, todoController.createTodo);
router.get('/todos', verifyToken, todoController.getAllTodos);
router.get('/todos/:id', verifyToken, todoController.getTodoByID);
router.get('/usertodos/:id', verifyToken, todoController.getAllTodoByID);


router.post('/login', userController.login);
router.post('/register', userController.register);

module.exports = router;
