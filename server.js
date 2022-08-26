const express = require('express')
const dotenv = require('dotenv')

//loading environment variables
dotenv.config({path: './config/config.env'})

const app = express()

const PORT = process.env.PORT || 3000

app.listen(3000, () => {
    console.log(`Server listening on port ${PORT}`);
});