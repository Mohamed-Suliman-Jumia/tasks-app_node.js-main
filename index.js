const createError = require("http-errors");
const express = require('express');
const morgan = require('morgan')
const mongoose = require('mongoose');
require("dotenv").config();
const fs = require('fs')
const path = require('path')
const usersRouter = require("./routes/users");
const tasksRouter = require("./routes/tasks");
const auth = require('./middleware/auth');
const { generalErrorHandler } = require("./middleware/errorHandlers");

//Constants 
const API_PORT = process.env.API_PORT;
const MONGO_URI = process.env.MONGO_URI;

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'),
    {
        flags: "a"
    }
)
//middleware
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :date[web]',
    { stream: accessLogStream })
)

// Routes
app.use("/user", usersRouter);
app.use(["/task", "/tasks"], auth, tasksRouter);

// Error handlers
app.use((req, res, next) => next(createError(404)));
app.use(generalErrorHandler);



// Configure mongoDB Database
mongoose.set('strictQuery', true);
mongoose.connect(MONGO_URI, (err) => {
    if (!err) return console.log(`DB Connected Success`);
    console.log(err);
});

// Server Listen
app.listen(API_PORT, (err) => {
    if (!err) return console.log(`Server Starts at Port ${API_PORT}`);
    console.log(err);
});
