const express = require("express");
const router = express.Router();

const {generalStats} = require("../haloAPI/matchmaking")

router.get("/:gamertag/:season",(req,res,next)=>{
    generalStats(req.params.gamertag, req.params.season)
    .then(result=>{
        return res.status(200).json(result);
    })
    .catch(err=>
        res.status(501).json({message:err.message, status:err.status})
    )
})

module.exports = router;