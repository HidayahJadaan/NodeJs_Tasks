// const name= "Hidayah";
// console.log(name);


const http = require('http');

const server = http.createServer((req, res) => {
    // console.log('request made')
    // console.log(req)
    console.log(req.url, req.method)
});

server.listen(5000, 'localhost', () => {
    console.log('listening for requests on port 5000')
});
