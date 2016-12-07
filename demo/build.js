var fs = require('fs');

fs.createReadStream('index.html').pipe(fs.createWriteStream('.build/index.html'));