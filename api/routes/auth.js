const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { regiserValidation, loginValidation } = require('../configs/datavalidation');
require('dotenv').config();


/**
* @swagger
*   /auth/create:
*   post:
*       description: create a new account
*       summary: 
*       tags:
*           - Authentication
*       responses:
*           '200':
*               description: create a new account & this will response a JWT auth token.
*               schema:
*                 type: object
*                 properties:
*                   name:
*                       type: string
*           '400':
*               description: new account error information
*               schema:
*                   type: object
*                   properties:
*                       message:
*                           type: string
*       parameters:
*         - in: body
*           name: acc info
*           schema:
*              type: object
*              properties:
*                  name:
*                      type: string
*                  email:
*                      type: string
*                  password:
*                      type: string
*/
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
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
        res.header('token', token).json({token: token});
    }catch(error){
        res.status(400).json({message: '500 Inernal Server Error', error: error});
    }
});


/**
* @swagger
*   /auth/login:
*   post:
*       description: authorize account
*       summary: 
*       tags:
*           - Authentication
*       responses:
*           '200':
*               description: Login to account and it will give JWT auth token
*               schema:
*                 type: string
*       parameters:
*         - in: body
*           name: auth info
*           schema:
*              type: object
*              properties:
*                  email:
*                      type: string
*                      required: true
*                  password:
*                      type: string
*                      required: true
*/
router.post('/login', async (req, res) => {
    // VALIDATE THE DATA
    const { error } = loginValidation(req.body);
    if(error) return res.status(400).json({message: error});

    const user = await User.findOne({"email": req.body.email});
    if(!user) return res.status(400).json({message: "User not found"});
    
    const verifyPassword = await bcrypt.compare(req.body.password, user.password);
    if(!verifyPassword) return res.status(400).json({message: "password error"});

    token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('token', token).json(token);
});

module.exports = router;