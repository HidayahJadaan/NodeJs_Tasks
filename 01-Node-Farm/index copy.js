const http = require("http");
const url = require("url");
const fs = require("fs");
const slugify = require("slugify");

function createServerWithData() {
  fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading data file:", err);
      return;
    }

    const dataObj = JSON.parse(data);

    fs.readFile(`${__dirname}/templates/template-overview.html`, "utf-8", (err, tempOverview) => {
      if (err) {
        console.error("Error reading overview template file:", err);
        return;
      }

      fs.readFile(`${__dirname}/templates/template-product.html`, "utf-8", (err, tempProduct) => {
        if (err) {
          console.error("Error reading product template file:", err);
          return;
        }

        fs.readFile(`${__dirname}/templates/template-card.html`, "utf-8", (err, tempCard) => {
          if (err) {
            console.error("Error reading card template file:", err);
            return;
          }

          const server = http.createServer((req, res) => {
            const { query, pathname } = url.parse(req.url, true);

            const slugs = dataObj.map((el) => slugify(el.productName), { lower: true });

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

            if (pathname === "/" || pathname === "/overview") {
              res.writeHead(200, { "Content-type": "text/html" });
              const cardsHTML = dataObj.map((card) => replaceTemplate(tempCard, card)).join("");
              const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHTML);
              res.end(output);
            } else if (pathname === "/product") {
              res.writeHead(200, { "Content-type": "text/html" });
              const product = dataObj[query.id];
              const output = replaceTemplate(tempProduct, product);
              res.end(output);
            } else if (pathname === "/api") {
              res.writeHead(200, { "Content-type": "application/json" });
              res.end(data);
            } else {
              res.writeHead(404, {
                "Content-type": "text/html",
                "my-own-header": "hello-world",
              });
              res.end("<h1>PAGE NOT FOUND!!!!</h1>");
            }
          });

          server.listen(9000, "127.0.0.1", () => {
            console.log("LISTENING TO REQUESTS ON PORT 9000");
          });
        });
      });
    });
  });
}

createServerWithData();
