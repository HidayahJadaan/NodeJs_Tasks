// streams: is for read or write sequentioally
// 2 types of streams:
// writable==> used to write data sequentually
// readable==> used to read data sequantually
// duplex==> used to read and write data sequentially
// transform==> data can be modified when writing or reading

// the most common use case for streaming is when reading or writeing large number of data
//  so we can not read or write them then save it in a string variable
// so the solution is to read streams from files


// Creating Big Stream
// const {writeFileSync} = require('fs');

// for(let i=0; i<10000; i++){
//     writeFileSync('./content/bigStream.txt', `____Hello____ ${i}\n`, {flag:'a'});
// }

const {createReadStream} = require('fs');
const stream = createReadStream('./content/bigStream.txt');

stream.on('data', (result)=>{
    // we read data in chunks
console.log(result);
})

// Checking an error
stream.on('error', (err)=>{
    // one of the errors is providing wrong file path
console.log(err);
})