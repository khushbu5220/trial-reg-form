const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/login-app-db', {
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology: true
}).then(() => {
    console.log("******************Connection successful******************")
}).catch((e) => {
    console.log("No connection")
})
