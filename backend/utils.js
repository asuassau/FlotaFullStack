// generate token using secret from process.env.JWT_SECRET
var jwt = require('jsonwebtoken');
 
// generate token para usuario y lo devulve 
function generateToken(user) {

  
  if (!user) {
    return null;
  } 
  var u = {
    id: user.id,
    name: user.name,
    username: user.username,
    isAdmin: user.isAdmin,
   // password: user.password
  };
 
  // valida el codigo secreto presente en .env y si el valido genera un token 
  return jwt.sign(u, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24 // expira 24 horas
  });
}
 
// devuelve los datos del usuario sin token
function getCleanUser(user) {
  if (!user) return null;
 
  return {
    id: user.id,
    name: user.name,
    username: user.username,
    isAdmin: user.isAdmin,
    //password: user.password
  };
}
 
module.exports = {
  generateToken,
  getCleanUser
}