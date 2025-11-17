const db = require("../models");
const Vehiculo = db.vehiculo;
const Op = db.Sequelize.Op;

// Create and Save a new Vehiculo
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


// Retrieve all Vehñiculos from the database.
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

// Find a single Vehñiculos with an id
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

// Update a Vehículos by the id in the request
exports.update = (req, res) =>  {
  const id = req.params.id;

  const data = {
    matricula: req.body.matricula,
    marca: req.body.marca,
    modelo: req.body.modelo,
    anio: req.body.anio
  };

  if (req.file) {
    data.filename = req.file.filename;
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

// Delete a Vehículos with the specified id in the request
exports.delete = (req, res) =>  {
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