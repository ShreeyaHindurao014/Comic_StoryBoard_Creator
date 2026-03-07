import express from "express";
import dotenv from "dotenv";
import recordRoutes from "./routes/recordRoutes.js";
import {connectDB} from "./config/db.js";
import n from "node:dns/promises";
import cors from "cors";

dotenv.config()
const app=express()
const port=process.env.PORT || 3001
app.use(cors(
    {
        //origin: http://localhost:5173
    }
))
n.setServers(["1.1.1.1","8.8.8.8"])
// // app.get('/',(req,res)=>{
// //     res.status(200).json("hello")
// //     console.log("hello")
// // })
// app.listen(port,()=>{
//     console.log(http://localhost:${port})
// })

app.use(express.json())
app.use("/records",recordRoutes)

connectDB().then(()=>{
    app.listen(port,()=>{
        console.log(http://localhost:${port}/records)
    })
})
