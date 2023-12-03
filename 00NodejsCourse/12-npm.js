// npm -- global command, comes with node
// npm --version

// ================================================ 

// local dependency - use it only in this particular project
// npm i <packageName>

// ================================================ 

// global dependency - use it in any project
// npm install -g <packageName>
// sudo install -g <packageName> (mac, linux)

// ================================================ 

// package.json -> manifest file (stores important info about project/paackage)
// manual approach -> create package.json in the root, create properties ...etc
// npm init (step by step, press enter to skip)
// npm init -y (everything default)

// NOTE: package.json is important when we start sharing our project
// with other developeres
// ================================================ 

const _ = require('lodash');
// console.log(_);
const items = [1, [2, [3,[4]]]];
const newItems = _.flattenDeep(items)
console.log(newItems);