const mongoose = require("mongoose");

// CONNECTING TO THE DATABSE
async function connectionToDB(){
try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB--- BookStroeDB")
}
   catch(err){
    console.log("Could not Connect To MongoDB -- BookStoreDB", err.message)
   }
}

// OLD WAY
// mongoose
// .connect(process.env.MONGO_URI)
// .then(() => console.log("Connected to MongoDB--- BookStroeDB"))
// .catch((err) =>
// console.log("Could not Connect To MongoDB -- BookStoreDB", err.message)
// );

module.exports= connectionToDB;