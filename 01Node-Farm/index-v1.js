// CREATING SIMPLE WEB SERVER

const http = require("http");
const url = require("url");

const fs = require("fs");

const server = http.createServer((req, res) => {
  // on each new request will log it to the console
  // console.log(req.url);


// ===================================
  // Solution: READ THE SYNC. VERSION (Needs TO Only READS ONCE)
  const data = fs.readFileSync(`${__dirname}/dev-data/data.json`);
  const dataObj = JSON.parse(data);
// ===================================


  const pathName = req.url;

//   OVERVIEW PAGE
  if (pathName === "/" || pathName === "/overview") {
    res.end("THIS IS THE OVERVIEW");




// PRODUCT PAGE
  } else if (pathName === "/product") {
    res.end("THIS IS THE PRODUCT");
 


// API PAGE
} else if (pathName === "/api") {
    // . in node means Desktop except in require==> __dirname
    // fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (err,data)=>{
    // const productData =JSON.parse(data);
    // // console.log(productData);
    // // SEND THE DATA AS A RESPONSE ==> STRING NOT OBJECT
    // res.writeHead(200, {'Content-type': 'application/json'})
    // res.end(data)
    // });
    // PROBLEM: The Above Way not GOOD Because Each Time A REquest happen we read the file again
  
   
        res.writeHead(200, {'Content-type': 'application/json'})
        res.end(data)
    
// PAGE NOT FOUND
} else {
    // ADDING STATUS CODE TO THE RESPONSE, writing on the header (we can use this to send some meta data about the response)
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    }); // in Network tab in Inspect
    res.end("<h1>PAGE NOT FOUND!!!!</h1>");
  }
  // SEND BACK RESPONSE OBJECT TO THE USER ON EACH TIME A NEW REQUEST IS HAPPENED
  // res.end('HELLO FROM THE SERVER');
});
// START LISTENING ON THE UPCOMMING REQUESTS
server.listen(8000, "127.0.0.1", () => {
  console.log("LISTENING TO REQUESTS ON PORT 7000");
});
