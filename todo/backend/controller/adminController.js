const User = require('../models/user')

exports.getAllUsers= async (req,res)=>{
    try{
        const  users = await User.find();
        res.json(users);
    } catch (err)
    {
        console.error("Admin getAllUsser error",err)
        res.status(500).json({error:"server error"})
    }
}