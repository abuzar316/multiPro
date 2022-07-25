const mongoose = require("mongoose");
require('dotenv').config();

const { DATABASE_NAME, DATABASE_URL } = process.env;

const url = `${DATABASE_URL}${DATABASE_NAME}`

module.exports = async () => {
    try {
        await mongoose.connect(url)
        console.log("Database connect successfully");
    } catch (error) {
        console.log(`Database Connection error ${error}`);
    }
}