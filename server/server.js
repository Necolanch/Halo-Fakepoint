const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const port = process.env.port || 3001;

const {generalStats}=require("./haloAPI/matchmaking");

const haloRoutes = require("./routes/haloRoutes");

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//middleware to handle CORS
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if (req.method==="OPTIONS") {
        res.header("Access-Control-Allow-Methods", "POST, PUT, GET, PATCH, DELETE");
    }

    next();
})

app.get("/",(req,res,next)=>{
    generalStats("NecolanchTTV", 1)
    .then(result=>{
        return res.status(200).json(result);
    })
    .catch(err=>
        res.status(501).json({message:err.message, status:err.status})
    )
})

app.get("/:gamertag/:season",(req,res,next)=>{
    generalStats(req.params.gamertag, req.params.season)
    .then(result=>{
        return res.status(200).json(result);
    })
    .catch(err=>
        res.status(501).json({message:err.message, status:err.status})
    )
})

app.use("/friends", haloRoutes);

//middleware modules
app.use((req, res, next) => {
    const error = new Error("not found");
    error.status = 404;
    next(error);
  });
  //middleware to send error nicely
  app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
      error: {
        message: error.message,
        status: error.status,
        method: req.method,
      },
    });
  });

//Connect to mongodb
mongoose.connect(process.env.mongoURL, err =>{
    if (err) {
        console.error("Error: ", err.message)
    } else {
        console.log("MongoDB connection successful")
    }
})

app.listen(port, () =>{
    return console.log(`Server is running on port ${port}`);
});