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

fs.readFile('./texts/start.txt', 'utf-8', (err, data)=>{
    // console.log(data);

    fs.writeFile('./texts/final.txt', `${data}\n NEW DATA HAS BEEN WRITTEN`, 'utf-8', err =>{
        console.log('YOUR DATA HAS BEEN WRITTEN');
    })
});



console.log('Non-Blocking Statements........');
