const {Book} = require('./models/Book');
const {books } = require('./data');
const dotenv = require('dotenv');
const connectionToDB = require('./config/db');

dotenv.config();

//Connection To DB
connectionToDB();
// IMPORT BOOKS
const importBooks = async()=>{
    try{
        await Book.insertMany(books);
        console.log("Books Imported")
        process.exit(0)
    }catch(err){
        console.log(err)
        process.exit(1)
    }
}
// DELETE BOOKS
const deleteBooks = async()=>{
    try{
        await Book.deleteMany();
        console.log("Books Deleted")
        process.exit(0)
    }catch(err){
        console.log(err)
        process.exit(1)
    }
}

if(process.argv[2] === "-import"){
    importBooks();
}
else if(process.argv[2] === '-remove'){
    deleteBooks();
}
