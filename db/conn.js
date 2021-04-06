const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_CONN, {
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology: true
}).then(() => {
    console.log("******************Connection successful******************")
}).catch((e) => {
    console.log("No connection")
})
