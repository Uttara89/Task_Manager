const express = require("express");
const app = express();

const taskRouter = require("./routes/taskRoutes");
const userRouter = require("./routes/userRoutes");

const{MONGO_IP,MONGO_PORT,MONGO_USER,MONGO_PASSWORD} = require("./config/config")

const MONGO_URL =`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`

const mongoose = require("mongoose");
mongoose.connect(
    MONGO_URL)
    .then(()=>{
        console.log("Successfully connected to MongoDB");
    })
    .catch((e)=>{
        console.log("Error trying to connect MongoDB: ",e);
        
    })

//to handle JSON
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("<h1>Hello world using Express and but this takes down...sdfsdf, wth</h1>");
})

app.use("/api/v1/tasks", taskRouter);
app.use("/api/v1/users", userRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`server started on PORT :${PORT}`);
})