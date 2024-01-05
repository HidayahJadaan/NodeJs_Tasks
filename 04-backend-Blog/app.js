const express = require('express');
const dotenv = require('dotenv').config();
const connectionToDB = require('./config/connectToDB');
const { errorHandler, notFound } = require('./middlewares/error');

// Connect to the database
connectionToDB();

// Init App
const app =express();

// Middlewares
app.use(express.json());

// Routes
app.use("/api/auth", require('./routes/authRoute'));
app.use("/api/users", require('./routes/UsersRoute'));
app.use("/api/posts", require('./routes/PostRoute'));
app.use("/api/comments", require('./routes/CommentsRoute'));
app.use("/api/categories", require('./routes/categoriesRoute'));



// SHould Be After The Routes
app.use(notFound) // SHould be before ERROR HANDLER
app.use(errorHandler)

// Running The Server
const PORT = process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log('Starting server on port '+PORT);
});