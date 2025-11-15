module.exports = app => {
  const vehiculos = require("../controllers/vehiculo.controller.js");

  var router = require("express").Router();

  // Create a new Vehiculo
  router.post("/", vehiculos.create);

  // Retrieve all Vehiculo
  router.get("/", vehiculos.findAll);

  // Retrieve a single Vehiculo with id
  router.get("/:id", vehiculos.findOne);

  // Update a Vehiculo with id
  router.put("/:id", vehiculos.update);

  // Delete a Vehiculo with id
  router.delete("/:id", vehiculos.delete);

  app.use('/api/vehiculos', router);
};
