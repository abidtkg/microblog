const express = require('express');
const router = express.Router();
const verify = require('../configs/tokenverify');
const User = require('../models/User');

router.get('/', verify, async (req, res) =>{
    const user = await User.find();
    try{
        res.json(user);
    }
    catch(error){
        res.status(400).json({message: error});
    }
});

module.exports = router;