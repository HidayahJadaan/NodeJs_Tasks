// READING & WRITING FILES (Sync----Blocking Way)
fs =require('fs');
// const text= fs.readFileSync('./texts/input.txt', 'utf-8');
// const OuputText = `Output Here:   ${text}`;
// console.log(OuputText);
// fs.writeFileSync('./texts/output.txt', text);
// console.log('Blocking Statements........');

// PATHS
console.log(__filename);
console.log(__dirname);


// READING & WRITING FILES (AsSync---- non-Blocking Way)

// fs.readFile('./texts/start.txt', 'utf-8', (err, data)=>{
//     // console.log(data);

//     fs.writeFile('./texts/final.txt', `${data}\n NEW DATA HAS BEEN WRITTEN`, 'utf-8', err =>{
//         console.log('YOUR DATA HAS BEEN WRITTEN');
//     })
// });



// console.log('Non-Blocking Statements........');

// =====================================
// CREATING SIMPLE WEB SERVER

const http = require('http');
const { isEqualWith } = require('lodash');
const url = require('url');

const server = http.createServer((req, res)=>{
    // on each new request will log it to the console
    // console.log(req.url);

const pathName = req.url;

if(pathName=== '/' || pathName === '/overview'){
    res.end('THIS IS THE OVERVIEW');
}
else if(pathName === '/product'){
    res.end('THIS IS THE PRODUCT')
}
else{
    // ADDING STATUS CODE TO THE RESPONSE, writing on the header (we can use this to send some meta data about the response)
    res.writeHead(404, {
'Content-type': 'text/html',
'my-own-header': 'hello-world'
    }); // in Network tab in Inspect
    res.end('<h1>PAGE NOT FOUND!!!!</h1>')
}
    // SEND BACK RESPONSE OBJECT TO THE USER ON EACH TIME A NEW REQUEST IS HAPPENED
    // res.end('HELLO FROM THE SERVER');

});
// START LISTENING ON THE UPCOMMING REQUESTS
server.listen(8000, '127.0.0.1', ()=>{
    console.log('LISTENING TO REQUESTS ON PORT 8000');
})