const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { regiserValidation, loginValidation } = require('../configs/datavalidation');
require('dotenv').config();
// CREATE NEW USER
router.post('/create', async (req, res) => {
    // VALIDATE DATA
    const {error} = regiserValidation(req.body);
    if(error) return res.status(400).json({message: error.details[0].message});
    const mailExist = await User.findOne({email: req.body.email});
    if(mailExist) return res.status(400).json({message: "The email already exist"});
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create a user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    try{
        const savedUser = await user.save();
        const token = jwt.sign({_id: user._id});
        res.header('auth-token', process.env.TOKEN_SECRET).json(token);
        
    }catch(error){
        res.status(400).json({message: error});
    }
});

// LOGIN A USER
router.post('/login', async (req, res) => {
    // VALIDATE THE DATA
    const { error } = loginValidation(req.body);
    if(error) return res.status(400).json({message: error});

    const user = await User.findOne({"email": req.body.email});
    if(!user) return res.status(400).json({message: "User not found"});
    
    const verifyPassword = await bcrypt.compare(req.body.password, user.password);
    if(!verifyPassword) return res.status(400).json({message: "password error"});

    token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).json(token);
});
module.exports = router;