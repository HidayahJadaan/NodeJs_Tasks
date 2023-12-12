// READING & WRITING FILES
fs =require('fs');
const text= fs.readFileSync('./texts/input.txt', 'utf-8');
const OuputText = `Output Here:   ${text}`;

fs.writeFileSync('./texts/output.txt', text);


// PATHS
console.log(__filename);
console.log(__dirname);