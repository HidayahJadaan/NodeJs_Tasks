//  when we working with file modules
//  we can do it synchronusly (non-blocking)
//  or we can do it async. (blocking)

// Sync Approcah
const { readFileSync, writeFileSync } = require("fs");
const first = readFileSync("./content/first.txt", "utf-8");
const second = readFileSync("./content/second.txt", "utf-8");

console.log(first, second);

// if the file  is not there, node will create it and then write
//  if the file is there, node will overwrite all the values that are in the file
writeFileSync(
  "./content/result-sync.txt",
  `Hello Hidayah, here is the result: ${first}, ${second}`,
);

// flag will create new variable
writeFileSync(
    "./content/result2-sync.txt",
    `Hello Hidayah, here is the result: ${first}, ${second}`,
    {flag: 'a'}
  );
  
