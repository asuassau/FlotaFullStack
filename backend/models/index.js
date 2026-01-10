// Se importan parametros del modelo
const dbConfig = require("../config/db.config.js");

//Se importa Sequelize del node module
const Sequelize = require("sequelize");

//  Se crea la instancia de Sequelize con la configuración de la base de datos
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

//Se crea un objeto para almacenar Sequelize y sequelize
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Se cargar el Sequelize y sequelize de los modelos vehiculo y user 
db.vehiculo = require("./myVehiculo.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);

//Se exportan modelos
module.exports = db;
