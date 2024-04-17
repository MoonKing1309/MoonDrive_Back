const express = require('express')
const app = express()
const cors = require("cors")
const body_parser = require("body-parser");



const dataRouter = require('./router/dataRouter')

app.use(body_parser.json())
app.use(body_parser.urlencoded({extended:true}))
app.use(cors());

app.use('',dataRouter)

app.listen(5001,()=>{
    console.log("Server Started on 5001")
})