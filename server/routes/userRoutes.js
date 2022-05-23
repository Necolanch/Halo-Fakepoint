const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const User = require("../models/userModel");

router.get("/:gamertag", (req, res)=>{
    const gt = req.params.gamertag
    User.findOne({gamertag:gt})
    .exec()
    .then(result=>{
        return res.status(200).json(result);
        
    })
    .catch(err=>{
        res.status(500).json({
            error:{
                message:err.message
            }
        })
    })
});

router.post("/", (req, res)=>{
    const newUser = new User({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        gamertag:req.body.gamertag,
        email:req.body.email
    })
    newUser.save()
    .then(result=>{
        res.status(200).json(result)
    })
    .catch(err=>{
        res.status(500).json({
            error:{
                message:err.message
            }
    })
    })
});

module.exports=router;