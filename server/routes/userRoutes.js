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

router.patch("/:gamertag", (req, res)=>{
    const gt = req.params.gamertag;
    const updatedAccount = {
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        gamertag:gt
    }
    User.findOneAndUpdate({gamertag:gt}, updatedAccount, {returnOriginal:false})
    .exec()
    .then(result=>{
        if (!result) {
            return res.status(404).json({
                message:Messages.teamNotFound
            })
        }
        res.status(200).json(result)
    })
    .catch(err=>{
        res.status(500).json({
            error:{
                message:err.message
            }
        })
    })
})

module.exports=router;