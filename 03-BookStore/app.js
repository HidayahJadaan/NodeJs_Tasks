const express = require('express')
const booksPath = require('./routes/books');
// Init application   
const app = express();
// Apply Middleware
app.use(express.json());

// Routes
app.use('/api/books', booksPath);
// Running The Server

const PORT = 4000;
app.listen(PORT, (req,res)=>{
    console.log(`Server is running on port ${PORT}`);
});