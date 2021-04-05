// start: nodemon app.js

const bodyParser = require('body-parser')
const express = require('express')
const path = require('path')

const { Router } = require("express");


const userRouter = require("./routers/user")
require("./db/conn")

const app = express()
app.use('/', express.static(path.join(__dirname, 'static')))
app.use(bodyParser.json())
app.use(userRouter);


app.listen(9999, () => {
    console.log('Server up at 9999')
})