const express = require('express')
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const booksPath = require('./routes/books');
const authorsPath = require('./routes/authors');
const logger = require('./middlewares/logger');
const {notFound, errorsHandler} = require('./middlewares/errors');
dotenv.config();
// CONNECTING TO THE DATABSE
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB--- BookStroeDB"))
  .catch((err) =>
    console.log("Could not Connect To MongoDB -- BookStoreDB", err.message)
  );

// Init application   
const app = express();
// Apply Middleware
app.use(express.json());
// CUSTOM MIDDLEWARE
app.use(logger);

// Routes
app.use('/api/books', booksPath);
app.use('/api/authors', authorsPath);

// ERROR HANDLER MIDDLEWARE
app.use(notFound);
app.use(errorsHandler);

// Running The Server
const PORT = process.env.PORT ||4000;
app.listen(PORT, (req,res)=>{
    console.log(`Server is running in${process.env.NODE_ENV} mode on port ${PORT}`);
});