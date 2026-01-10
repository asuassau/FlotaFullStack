
// Función que define y retorna el modelo User

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    password: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    username: {
      type: Sequelize.STRING
    },
    isAdmin: {
      type: Sequelize.BOOLEAN
    },
    surname: {
      type: Sequelize.STRING
    },
    filename: {
      type: Sequelize.STRING
    }

  });

  return User;
};