const fs = require("fs");
const path = require("path");

const currentFileName = path.basename(__filename);
const files = fs
  .readdirSync(__dirname)
  .filter((fileName) => /\.js$/.test(fileName) && fileName !== currentFileName)
  .forEach((fileName) => {
    const absPathToFile = path.resolve(__dirname, fileName);
    const Test = require(absPathToFile);
  });

console.log(files);
