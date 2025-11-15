module.exports = (sequelize, Sequelize) => {
  const Vehiculo = sequelize.define("vehiculo", {
    brand: {
      type: Sequelize.STRING
    },
    model: {
      type: Sequelize.STRING
    }
  });

  return Vehiculo;
};
