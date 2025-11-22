require('dotenv').config();

const express = require("express");
const cors = require ("cors");
const jwt = require('jsonwebtoken');


const bodyParser = require('body-parser');

var path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));


var corsOptions = {
origin:"http://localhost:8100"

};

app.use(cors(corsOptions));


//app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: true }));


//app.use(bodyParser.json());
app.use(express.json());

//app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.urlencoded({ extended: true }));


const db = require("./models");
// normal use. Doesn't delete the database data
// db.sequelize.sync();

// In development, you may need to drop existing tables and re-sync database
db.sequelize.sync({/* force: true*/ }).then(() => {
  console.log("Drop and re-sync db.");
});



app.use((req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return next(); // si no hay Authorization, seguimos

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



require("./routes/user.routes")(app);
require("./routes/vehiculo.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});