//Carga las varibles de entorno de .env y asigna sus valores a process.env
require('dotenv').config();


//Se importa express (de node module), framework para crear servidores web y APIs.
const express = require("express");
//Se importa cors (middleware que configura qué orígenes pueden realizar peticiones a mi backend desde el navegador)
const cors = require ("cors");

//Se importa jsonwebtoken (librería para crear y verificar tokens JWT)
const jwt = require('jsonwebtoken');

// Se importa body-parse (es una colección de middlewares. Su propósito es leer el body de la request y Convierte el body en req.body). No deberia de ser necesario ya que viene incluido en las versiones recientes de express
const bodyParser = require('body-parser');
// Se importa path , para trabajar con rutas sin tener en cuenta el sistema operativo
var path = require('path');

//se instalacia express
const app = express();

// sirve archivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));


var corsOptions = {
origin:"http://localhost:8100"
};
// Se indica que solo se admiten peticiones de este frontend
app.use(cors(corsOptions));


// permite leer JSON en el body de la petición
app.use(express.json());

// parsea datos enviados por formularios HTML
app.use(express.urlencoded({ extended: true }));


//Se importa el modelo 
const db = require("./models");

// Se inicializa el modelo (si se decomenta force:true se reinicia el modelo con la correspondiente perdida de información )
db.sequelize.sync({/* force: true*/ }).then(() => {
  console.log("Drop and re-sync db.");
});


// Middleware global que inspecciona el header Authorization y gestiona autenticación Basic y JWT

app.use((req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return next(); // si no hay Authorization, seguimos al siguiente middlerware (si queda alguno)

  // Si es Basic Auth 
  if (authHeader.startsWith('Basic ')) {
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    // Asegurarse de que req.body existe
    if (!req.body || typeof req.body !== 'object') {
      req.body = {};
    }

    req.body.username = username;
    req.body.password = password;

    return next();
  }

  // Si es Bearer token (JWT)
  if (authHeader.startsWith('Bearer ')) {
    const token = authHeader.replace('Bearer ', '');

    jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
     
     //corta el pipeline si hay un error 
      if (err) {
        return res.status(401).json({
          error: true,
          message: "Invalid user."
        });
      } else {
        req.user = user;
        req.token = token;
        return next();
      }
    });

    return;
  }

  // Si llega aquí, Authorization no es ni Basic ni Bearer
  return next();
});


// Se cargan y registran las rutas de usuario y vehículo

require("./routes/user.routes")(app);
require("./routes/vehiculo.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});