const fs = require("fs");
const path = require("path");

const { Client } = require("pg");
const config = require("../config/database.json");
const currentFileName = path.basename(__filename);
const dbConf = config[process.env.NODE_ENV || "development"];
console.log(dbConf);
const client = new Client(dbConf);

client.connect();
process.on("beforeExit", () => {
  client.end();
});

const db = {
  client,
};

fs.readdirSync(__dirname)
  .filter((fileName) => /\.js$/.test(fileName) && fileName !== currentFileName)
  .forEach((fileName) => {
    const Model = require(path.resolve(__dirname, fileName));
    Model.client = client;
    db[Model.name] = Model;
  });

module.exports = db;
