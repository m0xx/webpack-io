var fs = require('fs');


var fs = require('fs');
var buildDir = './.build';

if (!fs.existsSync(buildDir)){
    fs.mkdirSync(buildDir);
}
fs.createReadStream('index.html').pipe(fs.createWriteStream(buildDir + '/index.html'));