const names = require("./3-names"); // always start with dot, because there is 3rd party modules and built in modules
//  or {ahmad, mohammed} = require('./3-names');
const { sayHi } = require("./4-utiles");
const data = require("./5-alternative");

// Function
// require("./6-mind-grenade");

// console.log(names);
// sayHi("Hidayah");
// sayHi(names.ahmad);
// sayHi(names.mohammed);
// console.log(data);

// ================= WORKING WITH MODULES ======================
const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.end("Welcome to our home page");
  } else if (req.url === "/about") {
    res.end("Here is our short history");
  } else {
    res.end(`
    <h1>Oops!</h1>
    <p>We can't seem to find the page you are looking for</p>
    <a href="/">back home</a>
    `);
  }
  // console.log(req);
  // res.write('Welcome to our home page');
  // res.end();
});

// web server should keep listening to requests
server.listen(7000);
