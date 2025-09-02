import mongoose, { ConnectOptions } from "mongoose"

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'test'
// })

// connection.connect((err) => {
//     if (err) {
//         console.log('You are connected to the mysql database')
//     }
//     console.log('You are connected to mysql database')
// })

// module.exports = connection


// import mongoose from "mongoose";

// export const database = () => mongoose.connect('mongodb://127.0.0.1/UserApplication', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log('connected to mongodb')
// }).catch((err) => {
//     console.log('an error occured while connecting to mongodb', err)
// })

export const connectToMongoDB = () => {
    mongoose.connect('mongodb://127.0.0.1/bingeBox', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    } as ConnectOptions).then(() => {
        console.log('Successfully connected to MongoDB')
    }).catch(error => {
        console.log('an error has occured', error)
    })
}
