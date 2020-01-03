const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const verify = require('../configs/tokenverify');
const Post = require('../models/Post');
const { postValidation } = require('../configs/datavalidation');
require('dotenv').config();

router.get('/all', async (req, res) => {
    const post = await Post.find();
    try{
        res.json(post);
    }catch(error){
        res.status(400).json({message: error});
    }
});

// CREATE A NEW POST
router.post('/create', verify, async (req, res) =>{
    const token = req.header('auth-token');
    const verified = await jwt.verify(token, process.env.TOKEN_SECRET);

    const {error} = postValidation(req.body);
    if(error) return res.status(400).json({message: error.details[0].message});

    const post = new Post({
        user_id: verified._id,
        title: req.body.title,
        description: req.body.description
    });

    try{
        const savedPost = await post.save();
        res.json({post_id: savedPost._id});
    }catch(error){
        res.status(400).json({message: error});
    }
});

module.exports = router;