 const dotenv = require("dotenv");
const fs = require("fs");
const mongoose = require("mongoose");

//Load environment variables from.env file
dotenv.config({ path: "./config/config.env" });

//Load models
const cocktailModel = require("./models/ct_model");
const spiritModel = require("./models/sp_model");

//Connect to database
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//Read JSON file
const cocktailData = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/cocktails.json`, "utf-8")
);
const spiritData = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/spirits.json`, "utf-8")
);

//Import data to database
const importData = async () => {
    try {
        await cocktailModel.insertMany(cocktailData);
        await spiritModel.insertMany(spiritData);
        console.log("Cocktails and Spirits imported successfully");
    } catch (err) {
        console.error(err);
    }
}

//Delete data from database
const deleteData = async () => {
    try {
        await cocktailModel.deleteMany();
        await spiritModel.deleteMany();
        console.log("Cocktails and Spirits deleted successfully");
    } catch (err) {
        console.error(err);
    }
}

if (process.argv[2] === "import") {
    importData();
} else if(process.argv[2] === "delete") {
    deleteData();
}