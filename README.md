# Proyecto FullStack- Gestión de flotas. 

Esta es una aplicación diseñada para la  Gestión de Flotas  


Esta aplicación permite gestionar vehículos y conductores  mediante un CRUD completo (Crear, Leer, Actualizar y Eliminar). El proyecto está dividido en un backend desarrollado con Node.js, Express y Sequelize conectado a una base de datos MySQL, y un frontend construido con Ionic + Angular. Permite visualizar una lista de vehículos y conductores, añadir nuevos, editar registros existentes y eliminarlos. Esta aplicación se basa en un proyecto previo de ejemplo para bicicletas, que ha sido adaptado para gestionar de flotas.

## Getting Started

Para poder ejecturar el programa lo primero que debe hacer es descargar el codigo del Github del siguiente enlace: 

https://github.com/asuassau/FlotaFullStack


Nota:
El archivo .env se ha incluido en el repositorio de GitHub únicamente con fines educativos y para simplificar la ejecución del proyecto, a pesar de que no es una práctica segura en entornos reales.

Dentro del archivo .env existe la posibilidad de reiniciar la base de datos, generando un usuario administrador genérico (alejandro), modificando el valor de la variable DB_FORCE_SYNC (true / false). Dentro de el también esta la contraseña del usuario genérico (DEFAULT_ADMIN_PASSWORD)

## Prerequisites

- Node.js 
- npm
- MySQL
- MySQL Workbench
- Visual Studio Code
- Ionic CLI
- Angular CLI

## Installing


A continuación se detallan los pasos para configurar el entorno de desarrollo y arrancar el funcionamiento del programa.

1. Clonar el repositorio

git clone https://github.com/asuassau/FlotaFullStack


2. Instalar dependencias del backend

Ejecutar en la consola 

cd backend
npm install

3. Configurar la base de datos

Crear una base de datos MySQL Workbench

* el proyecto en la zona del frontend prodras apreciar que existe un archivo .env, en el estan los datos usados para la base de datos durante su desarrollo , en el caso de crear una base de datos alternativa tendrás que actualizar la información en este .env para que el programa pueda interactuar correctamente con la base de datos que has creado.  


4. Iniciar el backend
node server.js

El backend estará disponible en:
http://localhost:8080/api/vehiculos

5. Instalar dependencias del frontend
Ejecutar en la consola

cd frontend
npm install

6. Iniciar el frontend
Ejecutar en la consola 

cd frontend/src/app
ionic serve

La aplicación se abrirá automáticamente en:

http://localhost:8100


## API Testing (Postman)

El proyecto incluye una colección de Postman para probar los endpoints del backend.

Ruta:

[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://alejandrojesussuarezsaavedra-3865950.postman.co/collection/48544004-0b56854b-0a30-4deb-9f27-8ee9c144ce9a?source=rip_markdown)

La colección incluye:
- CRUD de vehículos
- CRUD de usuarios

## Tests

Actualmente el proyecto no incluye pruebas automatizadas.
Las pruebas de la API se han realizado manualmente mediante Postman.


## Versioning

1.0

## Authors

Alejandro Jesús Suárez Saavedra 

## License

El programa se ha desarrollado como un ejercisio educativo por lo que no tiene ningun tipo de licencia y su objetivo es que se pueda acceder a la información libremente 

## Acknowledgments

  Al proyecto original de bicicletas que sirvió como base
