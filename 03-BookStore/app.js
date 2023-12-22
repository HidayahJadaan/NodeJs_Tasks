const express = require('express')
const dotenv = require('dotenv');
const logger = require('./middlewares/logger');
const {notFound, errorsHandler} = require('./middlewares/errors');
const connectionToDB = require('./config/db');
dotenv.config();
// CONNECTING TO THE DATABSE
connectionToDB();

// Init application   
const app = express();
// Apply Middleware
app.use(express.json());
// CUSTOM MIDDLEWARE
app.use(logger);

// Template Engine
app.set('view engine', 'ejs');

// Routes
app.use('/api/books', require('./routes/books'));
app.use('/api/authors', require('./routes/authors'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/users',  require('./routes/users'));
app.use('/password', require('./routes/password'));

// ERROR HANDLER MIDDLEWARE
app.use(notFound);
app.use(errorsHandler);

// Running The Server
const PORT = process.env.PORT ||4000;
app.listen(PORT, (req,res)=>{
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});