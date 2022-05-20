const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Friend = require("../models/friendModel");

router.get("/", (req, res)=>{
    Friend.find({})
    .exec()
    .then(result=>{
        res.status(200).json(result);
    })
})

router.post("/", (req, res)=>{
    const newFriend = new Friend({
        gamertag:req.body.gamertag
    })

    Friend.find({gamertag:req.body.gamertag})
    .exec()
    .then(result=>{
        if (result.length>0) {
            return res.status(406).json({
                message:"Friend already added"
            })
        }

        newFriend.save()
        .then(result=>{
            res.status(200).json(result);
        })
        .catch(err=>{
            res.status(500).json({
                error:{
                    message:err.message
                }
        })
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:{
                message:`Unable to save friend with gamertag ${req.body.gamertag}`
            }
        })
    })
})

router.delete("/:gamertag", (req, res) => {
    const gamertag=req.params.gamertag;
    Friend.findOneAndDelete({gamertag:gamertag})
    .exec()
    .then(result=>{
        res.status(200)
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message
        })
    })
})

module.exports = router;