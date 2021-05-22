//import express, routes, mongoose, bodyparser
const express = require('express');
const PORT = process.env.PORT || 4000;
const morgan = require('morgan');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
//import db config file
const config = require('./config/db');
//initialize the app
const app = express();

// let productRoutes = require('./routes/userRoutes');


//registering cors : Cross-Origin Resource Sharing
app.use(cors());

//config body parser
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

//config morgan : loger tool used to log all request made on the server
app.use(morgan('dev'));

//configure database and mongoose 
const uri = config.uri;
mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then( () => {
        console.log('Database is connected');
    })
    .catch(err => {
        console.log({ database_error: err})
    });

//define user routes
const userRouter = require('./routes/userRoutes');
app.use("/user", userRouter);

//define services routes
const serviceRouter = require('./routes/serviceRoutes') ;
app.use("/service", serviceRouter);

//launch app to listen to specified PORT
app.listen(PORT, ()=>{
    console.log('server listenning on ' + PORT);
})