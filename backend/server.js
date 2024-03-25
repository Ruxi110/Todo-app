const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes');
const path = require('path');
const cors = require('cors');

app.use(cors());

const resetDatabase = async (req, res) => {
    try {
        await sequelize.sync({ force: true });
        res.status(201).send({
            message: "Reset complete!"
        });
    } catch (error) {
        console.error("Error resetting database:", error);
        res.status(500).send({
            message: "Internal Server Error"
        });
    }
};


const publicDirectoryPath = path.join(__dirname, 'public');
app.use(express.static(publicDirectoryPath));

app.get('/', (req,res)=> {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
})

app.get('/register', (req,res)=> {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
})

app.get('/todo', (req,res)=> {
    res.sendFile(path.join(__dirname, 'public', 'todo.html'));
})




app.get('/reset-database', resetDatabase);

app.use(bodyParser.json());

app.use('/api', routes);


app.all('*', (req,res,next) => {
   
    const err = new Error(`Can't find ${req.originalUrl} on this server`)
    err.status = 'fail'
    err.statusCode=404;

    next(err); // mereu cand dam param stie ca e eroare si se duce la ml care are err
})

app.use((err, req, res, next)=> {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    })
})




const PORT = 1234;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
