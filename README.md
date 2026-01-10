# Project Title

Aplicación de Gestión de Vehículos (Frontend Ionic + Backend Node.js)

One Paragraph of the project description

Esta aplicación permite gestionar vehículos mediante un CRUD completo (Crear, Leer, Actualizar y Eliminar). El proyecto está dividido en un backend desarrollado con Node.js, Express y Sequelize conectado a una base de datos MySQL, y un frontend construido con Ionic + Angular. Permite visualizar una lista de vehículos, añadir nuevos, editar registros existentes y eliminarlos. Esta aplicación se basa en un proyecto previo de ejemplo para bicicletas, que ha sido adaptado para gestionar vehículos.

## Getting Started


Estas instrucciones te permitirán obtener una copia del proyecto funcionando en tu máquina local para propósitos de desarrollo y pruebas. Consulta la sección de Deployment para información sobre la puesta en producción.

## Prerequisites

Requisitos necesarios para ejecutar el software y las herramientas relacionadas:

Node.js

MySQL

Ionic CLI

Angular CLI

## Installing


A continuación se detallan los pasos para configurar el entorno de desarrollo.

1. Clonar el repositorio

git clone https://github.com/asuassau/FlotaFullStack


2. Instalar dependencias del backend

cd backend
npm install

3. Configurar la base de datos

Crear una base de datos MySQL (por ejemplo: vehiculos_db)
Editar app/config/db.config.js con tus credenciales:

module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "1234",
  DB: "vehiculos_db",
  dialect: "mysql"
};

4. Iniciar el backend
node server.js

El backend estará disponible en:
http://localhost:8080/api/vehiculos

5. Instalar dependencias del frontend
bash
Copiar código
cd frontend
npm install

6. Iniciar el frontend
nginx
Copiar código
ionic serve
La aplicación se abrirá automáticamente en:

http://localhost:8100

Ejemplo de creación de vehículo:

POST http://localhost:8080/api/vehiculos
{
  "brand": "Toyota",
  "model": "Corolla"

}

*Nota : esto se encuentra aún en desarrollo y el ejemplo de como añadir un vehículo puede cambiar



## Running the tests

De momento no se encuentra implmetado ningún tipo de sistema de testeo

### Sample Tests

******************
### Style test
******************

## Deployment

******************
## Built With

******************

## Contributing

******************

## Versioning

1.0

## Authors

Alejandro Jesús Suárez Saavedra 
https://github.com/asuassau


## License

******************
## Acknowledgments

  Al proyecto original de bicicletas que sirvió como base
