const express = require('express')
const dotenv = require('dotenv')
const DBconnection = require('./config/database')

//loading environment variables
dotenv.config({path: './config/config.env'})

DBconnection();

//route files
const cocktails = require('./route/private/ct_private')

const app = express()

//mount routes
app.use('/api/v1/cocktails', cocktails);
app.use('/', express.static('public'));


const PORT = process.env.PORT || 3000;

app.listen(3000, () => {
    console.log(`Server listening on port ${PORT}`);
});