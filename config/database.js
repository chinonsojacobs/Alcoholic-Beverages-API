const mongoose = require('mongoose');
require('dotenv').config({ path: 'ENV_FILENAME' });

const DBconnection = async() => {
    const con = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    console.log(`Database successfully connected to ${con.connection.host}`.green.underline.bold)
}

module.exports = DBconnection;