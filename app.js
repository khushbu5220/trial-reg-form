// start: nodemon app.js
require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');

const { Router } = require("express");
const port = process.env.PORT;


const userRouter = require("./routers/user");
require("./db/conn");

const app = express();
app.use('/', express.static(path.join(__dirname, 'static')));
app.use(bodyParser.json());
app.use(userRouter);

// console.log(process.env.JWT_KEY)

app.listen(port, () => {
    console.log(`Server up at ${port}`)
})