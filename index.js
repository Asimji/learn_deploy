const express=require("express");
const connection = require("./db");
const userRouter = require("./routes/users.route");
const itemRouter = require("./routes/items.route");
const cors=require("cors")

require("dotenv").config();

const app=express();
app.use(cors())

app.use(express.json());
app.use("/users",userRouter)
app.use("/items",itemRouter)

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("DB is Connected")
        console.log(`Server is running at ${process.env.port}`);

    } catch (error) {
        console.log(error)
    }
})