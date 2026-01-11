//Rutas de vehículo

module.exports = app => {
  const vehiculos = require("../controllers/vehiculo.controller.js");
  var upload = require('../multer/upload');
  const auth = require("../controllers/auth.js");


  var router = require("express").Router();

  // Crea un nuevo vehículo
  router.post("/",auth.isAuthenticated, upload.single('file'),vehiculos.create);
  

  // Muestra todos los vehículos 
  router.get("/",auth.isAuthenticated, vehiculos.findAll);

  // Obtiene un vehículo por id
  router.get("/:id",auth.isAuthenticated, vehiculos.findOne);

  // Actualiza un vehículo por id
  router.put("/:id",auth.isAuthenticated, upload.single('file'), vehiculos.update);

  // Borra un vehículo por id 
  router.delete("/:id", auth.isAuthenticated,vehiculos.delete);

  app.use('/api/vehiculos', router);
};
