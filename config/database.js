const mongoose = require('mongoose');

const DBconnection = async() => {
    const con = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    console.log(`Database successfully connected to ${con.connection.host}`)
}

module.exports = DBconnection;