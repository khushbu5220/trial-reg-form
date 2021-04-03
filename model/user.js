const mongoose = require('mongoose')


const UserSchema = mongoose.Schema({
    username: {
        type: String
    },
    email:{
        type: String,
        unique:[true, "Email is already present"],
    },
    phone: {
        type:Number,
        unique: [true, "Phone no. is already present"]
    },
    address:{
        type: String
    },
    password: {
        type: String
    }
},{
    collection: 'users'
})

const model = mongoose.model('UserSchema', UserSchema)

module.exports = model