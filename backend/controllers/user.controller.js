
// importas el modelo y creas un objeto
const db = require("../models");
const User = db.user;

// Operadores de Sequelize para consultas avanzadas
const Op = db.Sequelize.Op;

//const utils = require("../utils");

//importa bcrypt para gestionar tokens 
const  bcrypt  =  require('bcryptjs');


//crea un nuevo usuario

exports.create = (req, res) => {

  if (!req.body.password || !req.body.username) {
    res.status(400).send({
      message: "No puede estar vacío"
    });
    return;
  }

  const user = {
    name: req.body.name,
    username: req.body.username,
    isAdmin: req.body.isAdmin ? req.body.isAdmin : false,
    surname: req.body.surname,
    filename: req.file ? req.file.filename : ""
  };

    if (req.body.password) {
    user.password = bcrypt.hash(req.body.password);
  }

  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "El usuario no se ha creado correctamente."
      });
    });
};



// Muestra todos los usuarios

exports.findAll = (req, res) => {
  User.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ha ocurrido un error y no es posible mostrar los usuarios"
      });
    });
};

// localiza a un usuario por su ID y lo devuelve

exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No se ha podido localizar el usuario con  id=${id} .`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al obtner el usuario con id= " + id
      });
    });

};


// actualiza a un usuario identificado por su id

exports.update =  (req, res) => {
  const id = req.params.id;

  const data = {
    name: req.body.name,
    username: req.body.username,
    isAdmin: req.body.isAdmin ? req.body.isAdmin : false,
    surname: req.body.surname,
  };

  if (req.body.password) {
    data.password = bcrypt.hash(req.body.password);
  }

  if (req.file) {
    data.filename = req.file.filename
  }


  User.update(data, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "El usuario se ha actulizado correctamente"
        });
      } else {
        res.send({
          message: `No ha sido posible actulizar el usuario con  id=${id}. Es posible que no se encuentre o que haya algún campo vacío `
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error actualizando el vehículos con id=" + id
      });
    });
};

// Borra un usuario concreto identificado por su id . 
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "El usuario se ha eliminado correctamente!"
        });
      } else {
        res.send({
          message: `No ha sido posible eliminar el usuario con id=${id}. Es posible que no se encuentre!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No ha sido posible eliminar el vehículo con id=" + id
      });
    });
};




/*
exports.create = (req, res) => {
  //Validate request
  if (!req.body.password || !req.body.username) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a User
  let user = {
    password: req.body.password,
    name: req.body.name,
    username: req.body.username,
    isAdmin: req.body.isAdmin ? req.body.isAdmin : false,
    surname:req.body.surname,
    filename: req.file ? req.file.filename : ""
  };

  User.findOne({ where: { username: user.username } })
    .then(data => {
      if (data) {
        const result = bcrypt.compareSync(user.password, data.password);
        if (!result) return res.status(401).send('Password not valid!');
        const token = utils.generateToken(data);
        // get basic user details
        const userObj = utils.getCleanUser(data);
        // return the token along with user details
        return res.json({ user: userObj, access_token: token });
      }

      user.password = bcrypt.hashSync(req.body.password);

      // User not found. Save new User in the database
      User.create(user)
        .then(data => {
          const token = utils.generateToken(data);
          // get basic user details
          const userObj = utils.getCleanUser(data);
          // return the token along with user details
          return res.json({ user: userObj, access_token: token });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the User."
          });
        });

    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });

};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {

  User.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id
      });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });

};


 // Delete a User with the specified id in the request
 exports.delete = (req, res) => {
   const id = req.params.id;

   User.destroy({
     where: { id: id }
   })
     .then(num => {
       if (num == 1) {
         res.send({
           message: "User was deleted successfully!"
         });
       } else {
         res.send({
           message: `Cannot delete User with id=${id}. Maybe User was not found!`
         });
       }
     })
     .catch(err => {
       res.status(500).send({
         message: "Could not delete User with id=" + id
       });
     });
 };*/