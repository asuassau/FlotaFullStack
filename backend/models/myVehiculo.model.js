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
    }


  });

  return Vehiculo;
};
