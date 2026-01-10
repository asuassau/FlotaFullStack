//Rutas de vehículo

module.exports = app => {
  const vehiculos = require("../controllers/vehiculo.controller.js");
  var upload = require('../multer/upload');
  const auth = require("../controllers/auth.js");


  var router = require("express").Router();

  // Create a new Vehiculo
  router.post("/",auth.isAuthenticated, upload.single('file'),vehiculos.create);
  //router.post("/", vehiculos.create);

  // Retrieve all Vehiculo
  router.get("/",auth.isAuthenticated, vehiculos.findAll);

  // Retrieve a single Vehiculo with id
  router.get("/:id",auth.isAuthenticated, vehiculos.findOne);

  // Update a Vehiculo with id
  router.put("/:id",auth.isAuthenticated, upload.single('file'), vehiculos.update);

  // Delete a Vehiculo with id
  router.delete("/:id", auth.isAuthenticated,vehiculos.delete);

  app.use('/api/vehiculos', router);
};
