const fs = require('fs');
const util = require('util');

/* beautiful async/await */
const readdir = util.promisify(fs.readdir);
// const readfile = util.promisify(fs.readFile);

module.exports = {

  getCarouselImageUrls: (folder) => readdir(folder)

};

