// start: nodemon app.js

const bodyParser = require('body-parser')
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const User = require('./model/user')
const bcrypt = require('bcryptjs')
const { ok } = require('assert')
const jwt = require('jsonwebtoken')
const { validate } = require('./model/user')
const validator = require('validator')

const JWT_SECRET = 'hnuheduhdy83yeudhuh1293-982ucfhfc(:")@#$%^34566*+=jbfcjkhueduf%$#U&%@@!@!*8gygyghgy'

const checkAuth = require('./middleware/check-auth');


mongoose.connect('mongodb://localhost:27017/login-app-db', {
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology: true
})

const app = express()
app.use('/', express.static(path.join(__dirname, 'static')))
app.use(bodyParser.json())


app.post('/api/change-password', async(req, res) => {
    const { token, newpassword: plainTextPassword } = req.body

    if(!plainTextPassword || typeof plainTextPassword !== 'string') {
        return res.json({ status: 'error', error: 'Invalid password' })
    }

    if(plainTextPassword.length < 7) {
        return res.json({ status: 'error', error: 'Password too small. Should be atleast 8 characters' })
    }

    try{
    const user = jwt.verify(token, JWT_SECRET)
    //....
    const _id = user.id

    const password = await bcrypt.hash(plainTextPassword, 10)
    await User.updateOne({
        _id
    },{
        $set: { password }
    })
    res.json({ status: 'ok' })

    }catch(error){
        console.log(error)
        res.json({status: 'error', error: ';))'})
    }

    console.log('JWT decoded: ', User)
    res.json({status: 'ok'})
})

app.post('/api/login', async (req, res) => {
    // console.log(req.body)
    try{
        const { email, password } = req.body

    const user = await User.findOne({ email: email }).lean()


    if(!user) {
        return res.json({status: 'error', error: 'Invalid email/password'})
    }

    if(await bcrypt.compare(password, user.password)) {
        // the username,password combination is successful 

        const token = jwt.sign({
            id: user._id, 
            email: user.email
        }, 
        JWT_SECRET
        )
        console.log(token)


        return res.json({status: 'ok', data: token })

    }else{
        res.json({status: 'error', error: 'Invalid email/password'})
    }


    }catch(error){
        res.json({error: error.message})
    }
    
})

app.post('/api/register', async (req, res) => {
    // console.log(req.body)

       // Hashing of password
    const { username, email, phone, address, password: plainTextPassword } = req.body

    if(!username || typeof username !== 'string') {
        return res.json({ status: 'error', error: 'Name is required' })
    }

    if(!email || typeof email !== 'string') {
        return res.json({ status: 'error', error: 'Email is required' })
    }

    if(!validator.isEmail(email)){
        return res.json({status: 'error', error: 'Wrong email'})
        }

    if(!phone || typeof phone !== 'string') {
        return res.json({ status: 'error', error: 'Phone no. is required' })
    }

    if(!address || typeof address !== 'string') {
        return res.json({ status: 'error', error: 'Address is required' })
    }


    if(phone.length !== 10) {
        return res.json({ status: 'error', error: 'Wrong phone no.' })
    }

    if(!plainTextPassword || typeof plainTextPassword !== 'string') {
        return res.json({ status: 'error', error: 'Password is required' })
    }

    if(plainTextPassword.length < 7) {
        return res.json({ status: 'error', error: 'Password too small. Should be atleast 8 characters' })
    }

    

    const password = await bcrypt.hash(plainTextPassword, 10)

    // console.log(await bcrypt.hash(password, 10))

    try {
        const response = await User.create({
            username,
           email,
           phone,
           address,
            password
        })
        console.log('User created successfully: ', response)
    } catch (error) {
        // console.log(JSON.stringify(error))
        if(error.code === 11000) {
            // duplicate key 
            return res.json({status: 'error', error: error.message})
        }
        throw error
    }


    res.json({ status: 'ok' })                                                                                               
})

app.post('/api/profile',checkAuth, async(req, res) => {
    
    try{
        res.status(200).json({
            id: req.userData.id,
            email: req.userData.email
        })


    }catch(error){
        console.log(error)
        res.json({status: 'error', error: ';))'})
    }

})






app.listen(9999, () => {
    console.log('Server up at 9999')
})