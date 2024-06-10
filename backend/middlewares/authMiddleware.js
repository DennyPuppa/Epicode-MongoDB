const jwt = require('jsonwebtoken');

//Middlewares
const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];

    if(!token) {
        return res.status(401).send('Invalid Token')
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = verified;
        next()
    } catch (error) {
        console.log(error);
        next(error)
    }
}

module.exports = authMiddleware;