// setInterval(()=>{
//     console.log('Hello World');
     
// }, 2000);
// console.log('I will  run first');
// =========================

const http = require('http');
const { url } = require('inspector');
const server = http.createServer((req, res)=>{
    // console.log('Request Event');// every time we make a request this line will  be excuted
    // res.end('Hello World');

    if(req.url === '/'){
        res.end('Welcome in home page');

    }
   else if(req.url === '/about'){
        // BLOCKING CODE !!! async code thar takes long time

        // for(let i = 0 ; i<1000; i++){
        //     for(let j=0; j<1000; j++)
        //     console.log(`${i}  ${j}`);
        // }

        res.end('ABOUT PAGE')
    }

    else{

        res.end('ERROOOORRRR!!!!')
    }
});

// Callback when we setting up the server
server.listen(5000, ()=>{
    console.log("Server is listening on port : 5000....");
})
console.log("Hello Hidayah");