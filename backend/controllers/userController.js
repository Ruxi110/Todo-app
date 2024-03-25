const userModel= require('../models').user;
const AppError = require('../appError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

exports.login = async (req, res) => {
    try{
        
         const {email, password} = req.body; //vezi
         console.log(email, ' ', password);
         
         const user = await userModel.findOne({
             where: {
                 email:email
             }
         });
           
        

         if(!user) {
             return res.status(404).json({ success: false, message: "User not found", data: {} });
         }

         const validPassword = bcrypt.compareSync(password, user.dataValues.password);

     if (!validPassword) {
         return res.status(401).json({ success: false, message: "Invalid password", data: {} });
     }
     console.log(user);

     const token = jwt.sign({ id: user.dataValues.id }, process.env.SECRET_TOKEN, {
         expiresIn: '1h'
     });


     res.status(200).json({ success: true, message: "User found", data: { token, userId: user.id } });
 } 
    
 catch (error) {
     res.status(400).send(error.message);
 }
};

exports.register = async (req, res) => 
{

    const { name, email, password, passwordConfirm } = req.body;
    try {
        if (password !== passwordConfirm) {
           
            throw new AppError("Passwords do not match", 400);
            //return res.status(400).json({ message: "Passwords do not match"});
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new AppError("Invalid email format", 400);
    }


        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            name: name,
            email: email,
            password: hashedPassword,
            passwordConfirm: hashedPassword
        });

        res.status(201).json({  message: "User created successfully", data: { user } });
    }
catch(error)
    {
        if (error instanceof AppError) {
            res.status(error.statusCode).send(error.message);
        } else 
            res.status(500).send('Internal Server Error');
    }
};