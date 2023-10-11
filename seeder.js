const dotenv = require("dotenv");
const fs = require("fs");
const mongoose = require("mongoose");

//Load environment variables from.env file
dotenv.config({ path: "./config/config.env" });

//Load models
const cocktailModel = require("./models/ct_model");

//Connect to database
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//Read JSON file
const cocktailData = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/cocktails.json`, "utf-8")
);

//Import data to database
const importData = async () => {
    try {
        await cocktailModel.insertMany(cocktailData);

        console.log("Cocktails imported successfully");
    } catch (err) {
        console.error(err);
    }
}

//Delete data from database
const deleteData = async () => {
    try {
        await cocktailModel.deleteMany();

        console.log("Cocktails deleted successfully");
    } catch (err) {
        console.error(err);
    }
}

if (process.argv[2] === "import") {
    importData();
} else if(process.argv[2] === "delete") {
    deleteData();
}