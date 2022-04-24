const asyncHanlder = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel');
const { use } = require('../routes/userRoutes');

// @desc register User
// @route POST /api/users
// @access Public
const registerUser = asyncHanlder( async (req,res) =>{

    const {name,email,password} = req.body;

    if(!name || !email || !password){
        res.status(400)
        throw new Error("Please add all fields")
    }

    // check if user exists

    const userExists = await User.findOne({email:email})
    
    if(userExists){
        res.status(400)
        throw new Error("User already exists")
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    // create user
    const user = await User.create({
        name,
        email,
        password:hashedPassword
    })

    if(user){
        res.status(201).json({
            _id:user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error("Invalid User data")
    }

});

// @desc register User
// @route POST /api/users/login
// @access Public
const loginUser = asyncHanlder( async (req,res) => {

    const {email,password} = req.body;
    
    // check for user in db
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password,user.password))){

        res.json({
            _id:user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })

    }else{
        res.status(400)
        throw new Error("Invalid Credentials")
    }
});


// @desc  User data
// @route GET /api/users/me
// @access Public
const getMe = asyncHanlder( async (req,res) =>{

   const {_id, name, email} = await User.findById(req.user.id)
   
   res.status(200).json({
       id: _id,
       name,
       email
   })
});


// generate Token

const generateToken = (id) => {
    return jwt.sign( {id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })

}

// @desc logout User
// @route POST /api/users/logout
// @access Public
const logoutUser = asyncHanlder( async (req,res) =>{

    res.status(200).json({message:'logout User'})
});

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getMe
}