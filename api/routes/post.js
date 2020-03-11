const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const verify = require('../configs/tokenverify');
const Post = require('../models/Post');
const { postValidation } = require('../configs/datavalidation');
require('dotenv').config();

/**
* @swagger
*   /post/{skip}/{count}:
*   get:
*       description: Get Posts
*       summary:
*       tags:
*           - Blog Post
*       responses:
*           '200':
*               description: responses of posts array
*               schema:
*                 type: object
*                 properties:
*                   _id:
*                       type: string
*                   user_id:
*                       type: string
*                   title:
*                       type: string
*                   description:
*                       type: string
*                   date:
*                       type: string
*       parameters:
*         - in: path
*           name: skip
*           schema:
*             type: integer
*           required: true
*         - in: path
*           name: count
*           schema:
*             type: integer
*           required: true
*/
router.get('/:skip/:count', async (req, res) => {
    const skip = +req.params.skip;
    const count = +req.params.count;
    const post = await Post.find().skip(skip).limit(count);
    try{
        res.json(post);
    }catch(error){
        res.status(400).json({message: error});
    }
});



/**
* @swagger
*   /post/create:
*   post:
*       description: Get Posts
*       summary:
*       tags:
*           - Blog Post
*       responses:
*           '200':
*               description: responses of posts array
*               schema:
*                 type: object
*                 properties:
*                   _id:
*                       type: string
*                   user_id:
*                       type: string
*                   title:
*                       type: string
*                   description:
*                       type: string
*                   date:
*                       type: string
*       parameters:
*         - in: header
*           name: auth-token
*           schema:
*             type: string
*           required: true
*         - in: body
*           name: post object
*           schema:
*             type: object
*             properties:
*                 title:
*                     type: string
*                 description:
*                     type: string
*           required: true
*/
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