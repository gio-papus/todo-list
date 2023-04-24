const express=require("express")

const mongoose=require("mongoose")

const dotenv =require("dotenv").config()

const app=express()

const cors = require("cors")

app.use(cors())

app.use(express.json())

const PORT = process.env.PORT  || 9000

const TodoItemRoute = require("./routes/todoItem")

app.listen(PORT, () => {
    console.log("connected with server")
})

mongoose.connect(process.env.DB_CONNECT)
.then(()=> console.log("In database"))
.catch(err => console.log(err))


app.use("/",TodoItemRoute)