const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const errorHandler = require('./middleware/errorHandler')
const DBconnection = require('./config/database')

//loading environment variables
dotenv.config({path: './config/config.env'})

DBconnection();

//route files
const cocktails = require('./route/private/ct_private')

const app = express()

app.use(express.json());

//mount routes
app.use('/api/v1/cocktails', cocktails);
app.use('/', express.static('public'));
app.use(errorHandler);


const PORT = process.env.PORT || 3000;

const server = app.listen(3000, () => {
    console.log(`Server listening on port ${PORT}`.blue.bold);
});

// Handle uncaught promise rejections
process.on('uncaughtException', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    //Close server and exit process
    server.close(() => {
        process.exit(1);
    });
});