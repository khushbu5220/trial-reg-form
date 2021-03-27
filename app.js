// start: node app.js



const bodyParser = require('body-parser')
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const User = require('./model/user')
const bcrypt = require('bcryptjs')
const { ok } = require('assert')

mongoose.connect('mongodb://localhost:27017/login-app-db', {
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology:true
})

const app = express()
app.use('/', express.static(path.join(__dirname, 'static')))
app.use(bodyParser.json())

app.post('/api/login', async (req, res) => {
    // console.log(req.body)
    const { username, password } = req.body

    const user = await User.findOne({ username, password }).lean()

    res.json({status: 'ok', data: 'Coming Soon'})
})

app.post('/api/register', async (req, res) => {
    // console.log(req.body)

       // Hashing
    const { username, password: plainTextPassword } = req.body

    if(!username || typeof username !== 'string') {
        return res.json({ status: 'error', error: 'Invalid username' })
    }

    if(!plainTextPassword || typeof plainTextPassword !== 'string') {
        return res.json({ status: 'error', error: 'Invalid password' })
    }

    if(plainTextPassword.length < 7) {
        return res.json({ status: 'error', error: 'Password too small. Should be atleast 8 characters' })
    }

    const password = await bcrypt.hash(plainTextPassword, 10)

    // console.log(await bcrypt.hash(password, 10))

    try {
        const response = await User.create({
            username,
            password
        })
        console.log('User created successfully: ', response)
    } catch (error) {
        // console.log(JSON.stringify(error))
        if(error.code === 11000) {
            // duplicate key 
            return res.json({status: 'error',  error: 'Username already in use'})
        }
        throw error
    }

    res.json({ status: 'ok' })                                                                                               
})

app.listen(9999, () => {
    console.log('Server up at 9999')
})