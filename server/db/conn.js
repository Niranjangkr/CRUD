const mongoose = require('mongoose')
require('dotenv').config()
const uri = process.env.CONNECTION_STRING 

const connectDB = () => {
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log("Connection start")).catch(error => console.log(error)) 
}

module.exports = connectDB

















// const mongoose = require('mongoose')
// const uri = "mongodb+srv://niranjangaonkar09:J000VzMUEikqhxb8@cluster0.8armdul.mongodb.net/mernstack?retryWrites=true&w=majority"

// const connectDB = () => {
//     mongoose.connect(uri, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     }).then(()=> console.log("connection start")).catch((error) => console.log(error.message))
// }

// module.exports = connectDB
