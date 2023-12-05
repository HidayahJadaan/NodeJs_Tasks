const fs = require('fs')

const readStream = fs.createReadStream("./content/stream.txt", 'utf8');
const writeStream = fs.createWriteStream("./content/outputStream.txt", "utf8");

console.log("Read Stream...", readStream);

writeStream.on("data", (chunks)=>{
    writeStream.write("\n___________CHUNKS_________\n");
    writeStream.write(chunks);
});