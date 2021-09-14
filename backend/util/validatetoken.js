const jwt = require('jsonwebtoken');

const verifytoken = (req,res,next) => {
    const token = req.body.token;
    if(!token) return res.status(401).send('Access Denied')

    try {
        const verified = jwt.verify(token,config.jwt.tokenSecret);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send('Invalid Token');
    }
}

module.exports = verifytoken;