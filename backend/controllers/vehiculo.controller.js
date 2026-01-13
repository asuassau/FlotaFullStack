// Se importae el modelo y se crea objeto 
const db = require("../models");
const Vehiculo = db.vehiculo;

//Se crea objeto con operaciones de Sequelize
//const Op = db.Sequelize.Op;

// Crea un nuevo vehículo 
exports.create = (req, res) => {

  if (!req.body.matricula) {
    res.status(400).send({
      message: "No puede estar vacío"
    });
    return;
  }

  const vehiculo = {
    matricula: req.body.matricula,
    marca: req.body.marca,
    modelo: req.body.modelo,
    anio: req.body.anio,
    filename: req.file ? req.file.filename : ""
  };

  Vehiculo.create(vehiculo)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "El vehículo no se ha creado correctamente."
      });
    });
};


// Devuelve todo los vehículos almacenados en la base de datos. 
exports.findAll = (req, res) => {
  Vehiculo.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ha ocurrido un error y no es posible mostrar la flota"
      });
    });
};

// Busca un vehículo en concreto a través de la id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Vehiculo.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No se ha podido localizar el vehículo con  id=${id} .`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al obtner el vehículo con id= " + id
      });
    });

};

// Actualiza un vehículo concreto. 
exports.update = (req, res) => {
  const id = req.params.id;

  const removeImage =
    req.body.removeImage === true ||
    req.body.removeImage === 'true' ||
    req.body.removeImage === '1' ||
    req.body.removeImage === 1;

  const data = {
    matricula: req.body.matricula,
    marca: req.body.marca,
    modelo: req.body.modelo,
    anio: req.body.anio,
  };

  if (req.file) {
    data.filename = req.file.filename
  }

  if (removeImage) {
    data.filename = null;
  }

  Vehiculo.update(data, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "El vehículo se ha actulizado correctamente"
        });
      } else {
        res.send({
          message: `No ha sido posible actulizar el vehículo con  id=${id}. Es posible que no se encuentre o que haya algún campo vacío `
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error actualizando el vehículos con id=" + id
      });
    });
};

// Borra un vehículo concreto identificado por la id
exports.delete = (req, res) => {
  const id = req.params.id;

  Vehiculo.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "El vehículos se ha eliminado correctamente!"
        });
      } else {
        res.send({
          message: `No ha sido posible eliminar el vehículo con id=${id}. Es posible que no se encuentre!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No ha sido posible eliminar el vehículo con id=" + id
      });
    });
};


