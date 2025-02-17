const User= require('../models/user')
const bcrypt= require('bcrypt')
const jwt = require ('jsonwebtoken')

exports.signup = async (req,resp)=>{
    try{
        const {username,email,password,role} = req.body;

        //validation
        if(!username||!email||!password)
        {
            return resp.status(400).json({erro:'No empty field required'})
        }
        const existingUser = await User.findOne({ $or: [{ username }, { email }] })
        ;
        if(existingUser)
        {
            return resp.status(400).json({error: 'username or email already in use '})
        }



        //hash Paswword
        const hashedPassword= await bcrypt.hash(password, 10);
        console.log(hashedPassword);              
        // user 
        const newUser = new User({
            username,email,
            password:hashedPassword,
            role:  role|| 'user',
        })

// const newUser = new User({
//   username: "Ram",
//   email: "Ram@gmail.com",
//   password: hashedPassword,
//   role: "admin",  // Make sure this is "admin" if you want the role to be admin
// });
        await newUser.save();
        return resp.status(201).json({
            message: 'User created successfully',
          });
        } catch (err) {
          console.error(err);
          return resp.status(500).json({
            error: 'Internal server error',
          });
}
}
exports.login = async (req,res)=>{
    try {
        const {email,password} = req.body;

        //validation
        if(!email || !password)
        {
            return res.status(400).json({error:'Email and password are required'})

        }

        // find user by email
        const user =await User.findOne({email})
        if(!user){
            return res.status(401).json({error:'Invalid Details or credentials'})
        }

        //check Password
        const isMatch = await bcrypt.compare(password, user.password)
        console.log(isMatch) 
        
          if(!isMatch)
          {
            return res.status(401).json({error:'Invalid Credentials'})
          }

          //generate JWT
          const token= jwt.sign(

            {userId:user._id, role:user.role},
            process.env.JWT_SECRET,
            {
                expiresIn : '1h'
            }
          )
           return res.json({message:'Login Successful',
            token
           })
        } catch (err)
        {
            console.error('Login error',err);
            return res.status(500).json({error:'Servor error'})
        }
    }
