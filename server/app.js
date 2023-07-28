const express = require('express')
const app = express()
const connectDB = require('./db/conn')
const router = require('./routes/router')
const port = 5000
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.use(router)

const start = async() => {
    try {
        await connectDB()
        app.listen(port, () => {
            console.log(`listenting at port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }    
}

start()






















// const express = require('express')
// const app = express()
// const connectDB = require('./db/conn')
// const users = require('./models/userSchema')
// const cors = require('cors')
// const router = require('./routes/router')

// const port = 5000

// app.use(cors())
// app.use(express.json())

// app.use(router)

// const start = async () => {
//     try{
//         await connectDB()
//         app.listen(port, () => {
//             console.log(`listening at port ${port}`)
//         })
//     }catch(error){
//         console.log(error)
//     }
// }

// start()