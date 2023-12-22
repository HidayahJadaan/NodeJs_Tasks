const http = require("http");
const url = require("url");
const fs = require("fs");
const slugify = require("slugify");

// Read data files and templates outside the request handler
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);

// // Create server and define request handling logic
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  // ===================================

  const slugs = dataObj.map((el) => slugify(el.productName), { lower: true });
  // console.log(slugs);
  // ===================================
  // using regular expression not "" | ' ==> because some times we have multiple items
  const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);

    if (!product.organic)
      output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
    return output;
  };



  //   OVERVIEW PAGE
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });
    const cardsHTML = dataObj
      .map((card) => replaceTemplate(tempCard, card))
      .join("");
    // console.log(cardsHTML);
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHTML);
    res.end(output);

    // PRODUCT PAGE
  } else if (pathname === "/product") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    // res.end("THIS IS THE PRODUCT");

    // API PAGE
  } else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);

    // PAGE NOT FOUND
  } else {
    // ADDING STATUS CODE TO THE RESPONSE, writing on the header (we can use this to send some meta data about the response)
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    }); // in Network tab in Inspect
    res.end("<h1>PAGE NOT FOUND!!!!</h1>");
  }
}
);
// console.log("Hello World");
console.log("Hello Hidayah");

// Start listening on the specified port
server.listen(9000, "127.0.0.1", () => {
  console.log("LISTENING TO REQUESTS ON PORT 9000");
});
