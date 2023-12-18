const fs = require("fs");
const http = require("http");
const url = require("url");

// SYNC. VERSION HERE DOSEN'T MAKE A PROBLEM; IT IS ONLY HAPPEN ONCE
const jsonData = fs.readFileSync(`${__dirname}/data/data.json`, "utf-8");
const laptopData = JSON.parse(jsonData);

// console.log(laptopData);

// 1. Create Server
const server = http.createServer((req, res) => {
  // This Callback function runs each time as someone accesses our web server
  // and this response has a header (status code, format for the content type)
  console.log("Someone did access the server");

  //   true--> to make sure that the query in the req object is parsed into an object
  const pathName = url.parse(req.url, true).pathname;
  // console.log(pathName);
  //   const query = url.parse(req.url, true).query;
  const id = url.parse(req.url, true).query.id;

  //   PRODUCT OVERVIEW
  if (pathName === "/products" || pathName === "/") {
    // Send response back to the server
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    fs.readFile(`${__dirname}/templates/overview.html`,"utf-8",(err, data) => {
        let overviewOutput =data;

        fs.readFile(`${__dirname}/templates/card.html`,"utf-8",(err, data) => {
            const cardsOutput = laptopData.map((currentLaptop) =>replaceTemplate(data, currentLaptop)).join('');
            overviewOutput = overviewOutput.replace('{%CARDS%}', cardsOutput);

            res.end(overviewOutput);
          }
        );
      }
    );

    // res.end(`Welcome in product page`);
  }
  //   LAPTOP DETAILS
  else if (pathName === "/laptop" && id < laptopData.length) {
    // Send response back to the server
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    // NOT GO TO THE Sync. VERSION --> IT IS ALWAYS BLOCKING (MAKES THE ENTIRE CODE STOPS FOR THE TIME THAT THE FUNCTION DOINF IT'S WORK and thats block the entire thread for all the users that they are accessing your code --> 1 THREAD at a time)
    fs.readFile(`${__dirname}/templates/laptop.html`, "utf-8", (err, data) => {
      const laptop = laptopData[id];
      const output = replaceTemplate(data, laptop);
      res.end(output);
    });
  }

//   Route For Images
else if ((/\.(jpg|jpeg|png|gif)$/i).test(pathName)) {
    fs.readFile(`${__dirname}/data/img${pathName}`, (err, data) => {
        res.writeHead(200, { 'Content-type': 'image/jpg'});
        res.end(data);
    });
}
  //   URL NOT FOUND
  else {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    res.end("404 NOT FOUND IN THE SERVER!!!");
  }
});

// 2. Keep Listening for the server on a certain port
server.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// 3. Create a route for the server(Responed in diferent ways for different URLs)
// ==> DO IT IN THE SERVER CALLBACK FUNCTION

// ==============================

function replaceTemplate(orignalHTML, laptop) {
  let output = orignalHTML.replace(/{%PRODUCTNAME%}/g, laptop.productName);
  output = output.replace(/{%IMAGE%}/g, laptop.image);
  output = output.replace(/{%PRICE%}/g, laptop.price);
  output = output.replace(/{%SCREEN%}/g, laptop.screen);
  output = output.replace(/{%CPU%}/g, laptop.cpu);
  output = output.replace(/{%RAM%}/g, laptop.ram);
  output = output.replace(/{%STORAGE%}/g, laptop.storage);
  output = output.replace(/{%DECRIPTION%}/g, laptop.description);
  output = output.replace(/{%ID%}/g, laptop.id);

  return output;
}
