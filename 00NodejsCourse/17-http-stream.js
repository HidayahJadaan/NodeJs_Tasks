// Creating Huge Stream
var fs = require("fs");
var http = require("http");

http
  .createServer(function (req, res) {
    const te̥xt = fs.readFileSync("./content/bigStream.txt", "utf8");
    // console.log("🚀 ~ file: 17-http-stream.js:8 ~ te̥xt:", te̥xt) // Ctrl + Alt + L
    res.end(text);
  })
  .listen(5000);

// the problem with the setup is following where if
// the size of the file

// pip method for filestream==> pushing from the read stream into write stream
// we can read | write data in chunks
