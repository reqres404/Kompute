const jwt = require('jsonwebtoken')

const verifyJWT = (req,res,next)=>{
    const token  = req.header('auth-token')
    if(!token){
        return res.status(401).json({message:"No token, Authorisation denied"})
    }
    try {
        const verified = jwt.verify(token,'secretkey')
        req.user = verified
        next()
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
}

module.exports = verifyJWT