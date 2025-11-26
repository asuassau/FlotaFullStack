require('dotenv').config();


module.exports = {
  HOST: process.env.DB_HOST,
  USER: process.env.MYSQL_USER,
  PASSWORD: process.env.MYSQL_PASSWORD,
  DB:  process.env.MYSQL_DATABASE,
  dialect: "mysql",
  pool: {
    max: 25,
    min: 0,
    acquire: 30000,
    idle: 100000
  }
};