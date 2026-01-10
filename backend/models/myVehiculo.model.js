
// Función que define y retorna el modelo Vehiculo
module.exports = (sequelize, Sequelize) => {
  const Vehiculo = sequelize.define("vehiculo", {

    matricula: {
      type: Sequelize.STRING
    },
    
    marca: {
      type: Sequelize.STRING
    },
    modelo: {
      type: Sequelize.STRING
    },

    anio: {
      type: Sequelize.STRING
    },

    filename: {
       type: Sequelize.STRING
    }

  });

  return Vehiculo;
};
