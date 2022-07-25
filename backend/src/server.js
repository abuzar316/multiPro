const app = require("./app");
const connect = require('./database/connection');

// env file config
require('dotenv').config();

// database function call
connect()

// run express
const PORT = process.env.PORT || 4000;

// listen on port
app.listen(PORT, () => console.log(`Server is Running on Port ${PORT}`));