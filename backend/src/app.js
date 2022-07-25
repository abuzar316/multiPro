const express = require("express");
const app = express();
const cors = require('cors');

// error handlers import
const errorHandle = require("./error/errorHandle");
// import error 404 controller
const error404 = require('./error/error404');
// import user routes
const userRoutes = require("./routes/userRoutes");


// middleware use
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// route uses

// use all routes
app.use(userRoutes, error404);
// page not found routes
// app.use(error404);
// error handlers use 
app.use(errorHandle);


module.exports = app;