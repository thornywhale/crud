const { Thing } = require("../models");

module.exports.getAllThings = async (req, res, next) => {
  try {
    const things = await Thing.findAll();
    if (things.length === 0) {
      return res.status(204).send({ data: "Empty" });
    }
    res.status(200).send({ data: things });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports.getThing = async (req, res, next) => {
  try {
    const {
      params: { thingId },
    } = req;
    const thing = await Thing.findByPk(thingId);
    if (!thing) {
      return res.status(404).send({ data: "Not found" });
    }
    res.status(200).send({ data: thing });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports.createThing = async (req, res, next) => {
  try {
    const { body } = req;
    const thing = await Thing.create(body);
    if (thing) {
      return res.status(201).send({ data: thing });
    }
    res.status(400).send({ data: "Bad request" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports.updateThing = async (req, res, next) => {
  try {
    const {
      body,
      params: { thingId },
    } = req;
    const thing = await Thing.updateByPk(thingId, body);
    if (thing) {
      return res.status(203).send({ data: thing });
    }
    res.status(400).send({ data: "Bad request" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports.deleteThing = async (req, res, next) => {
  try {
    const {
      params: { thingId },
    } = req;

    const thing = await Thing.deleteByPk(thingId);
    if (!thing) {
      return res.status(204).send({ data: "No content" });
    }
    res.status(200).send({ data: thing });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
