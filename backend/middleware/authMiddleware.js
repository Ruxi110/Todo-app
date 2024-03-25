const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    const bearerHeader = req.headers ['authorization'];
    const token = bearerHeader?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ success: false, message: 'Unauthorized - No token provided' });
        //return handleErrorResponse(res, null, 'Unauthorized - No token provided', 401);
    }

    jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
        if (err) {
            return res.status(401).json({ success: false, message: 'Unauthorized - Invalid token' });
            //AppError("Unauthorized - No valid token", 401)
           // return handleErrorResponse(res, err, 'Unauthorized - No valid token', 401)
        }

        req.userId = decoded.id;

        next();
    })
};

module.exports = verifyToken;
