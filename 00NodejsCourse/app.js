const names = require("./3-names"); // always start with dot, because there is 3rd party modules and built in modules
//  or {ahmad, mohammed} = require('./3-names');
const { sayHi } = require("./4-utiles");
const data = require("./5-alternative");

// Function
require("./6-mind-grenade");

// console.log(names);
sayHi("Hidayah");
sayHi(names.ahmad);
sayHi(names.mohammed);
console.log(data);

// ================= WORKING WITH MODULES ======================
