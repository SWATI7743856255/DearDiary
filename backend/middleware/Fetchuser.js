const jwt = require('jsonwebtoken');
const jwt_secretKey = 'DreamersDiary$';

const Fetchuser=async (req,res,next)=>{
    const token = req.header('auth-token');

    if (!token) {
        return res.status(401).send({ error: 'Authentication token is missing' });
    }

    try {
        const data=jwt.verify(token,jwt_secretKey);
        req.user=data.user;
        next();

    } catch (error) {
        return res.status(401).send({ error: 'Authenticate using valid token' });

    }


}
module.exports=Fetchuser;