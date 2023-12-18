const express = require('express')
const booksPath = require('./routes/books');
const authorsPath = require('./routes/authors');

// Init application   
const app = express();
// Apply Middleware
app.use(express.json());

// Routes
app.use('/api/books', booksPath);
app.use('/api/authors', authorsPath);
// Running The Server

const PORT = 4000;
app.listen(PORT, (req,res)=>{
    console.log(`Server is running on port ${PORT}`);
});