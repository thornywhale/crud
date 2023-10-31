const express = require("express");
const ThingController = require("./controllers/thing.controller");
const errorHandler = require("./errorHandlers/errorHandler.mw");
const app = express();

app.use(express.json());

app
  .route("/things")
  .get(ThingController.getAllThings)
  .post(ThingController.createThing);

app
  .route("/things/:thingId")
  .get(ThingController.getThing)
  .put(ThingController.updateThing)
  .delete(ThingController.deleteThing);

app.use(errorHandler);

module.exports = app;
