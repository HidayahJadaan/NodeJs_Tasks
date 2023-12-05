// Creating Huge Stream
var fs = require("fs");
var http = require("http");

http
  .createServer(function (req, res) {
    const text = fs.readFileSync("./content/bigStream.txt", "utf8");
    res.end(text);
  })
  .listen(5000);

// the problem with the setup is following where if
// the size of the file

// pip method for filestream==> pushing from the read stream into write stream
// we can read | write data in chunks
