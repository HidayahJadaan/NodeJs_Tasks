
// ================= PATH MODULE ======================
const path = require('path')
//  separators property that returns a platform specific separator
console.log(path.sep);

// join method: joins a sequence of paths segments using that 
// platform specific separator as the limiter
// and second thing it does it; it returns a normalized resulting path

const filepath = path.join('/content', 'subfolder', 'test.txt')
console.log(filepath);

// the final portion of the file path
const baseName= path.basename(filepath)
console.log(baseName);
// current file path
const absolute = path.resolve(__dirname, 'conatent', 'subfolder', 'test.txt');
console.log(absolute);
