const db = require("../models");
const Vehiculo = db.vehiculo;
const Op = db.Sequelize.Op;

// Create and Save a new Vehiculo
exports.create = (req, res) => {

      if (!req.body.brand) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
}

const vehiculo = {
    brand: req.body.brand,
    model: req.body.model
  };

 Vehiculo.create(vehiculo)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the vehiculos."
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
          err.message || "Some error occurred while retrieving vehiculos."
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
          message: `Vehiculo with id=${id} not found.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Vehiculo with id= " + id
      });
    });

};

// Update a Vehículos by the id in the request
exports.update = (req, res) =>  {
  const id = req.params.id;

  Vehiculo.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Vehículo was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Vehiculo with id=${id}. Maybe Vehículo was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Vehículo with id=" + id
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
          message: "Vehículo was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Vehículo with id=${id}. Maybe Vehículo was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Vehiculo with id=" + id
      });
    });
};