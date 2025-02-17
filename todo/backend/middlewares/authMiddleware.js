
const jwt= require('jsonwebtoken')

module.exports=(req,res,next)=> {


    const authHeader = req.headers.authorization;

    if(!authHeader)
    {
        return res.status(401).json({error:'no token provided '})
    
    }

    // token is in format Bearer <token>
    const token = authHeader.split(' ')[1];
    if(!token)
    {
        return res.status(401).json({error:'Token format inavlid'})
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log("Decoded token:", decoded);
        req.user = decoded;
        next();
    }
    catch(error)
    {
        console.error('JWT verification error',error)
        return res.status(401).json({error:'Invalid Token'})
    }
}