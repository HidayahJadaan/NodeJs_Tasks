const EventEmitter = require('events');
const customEmitter = new EventEmitter();
// on - listen for an event
// emit - emit an event

customEmitter.on('response', ()=>{
    console.log(`data recieved `);
})

// listeing to the same event with different logic (point *First)
customEmitter.on('response', ()=>{
    console.log(`some other logic here `);
})

//First:  we can have as many methods as we want ('response)
// Second: we listen for event then we emit it, if we place emit before the listeing function we will not have any thing on the console
// Third: we can pass the argument when we emit the event, and we can use it in the listening function as a any function parameters

customEmitter.on('response', (name, id)=>{
    console.log(`some other logic here ${name}, ${id}`);
})
customEmitter.emit('response', 'Hidayah', '23');// pass the same string that we listen for


// =======================================

const http = require('http');

// Using Event Emitter API
const server = http.createServer();
//Emits Request Event
// Subscribe to it / listen for it/ respond to it

server.on('request',(req,res)=>{
    res.end('WELCOME !!!!')
})

server.listen(9000);