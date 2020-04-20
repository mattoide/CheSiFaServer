// app.js
const express = require('express')
const app = express()
var cors = require('cors')
app.use(cors())

const pool = require('./database/dbConnPool')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const utentiRouters = require('./routes/utenti')
// const optionsRouter = require('./routes/options')

app.use(function(req, res, next) {

  console.log(req.hostname)
  console.log(req.url)
  next();

});

app.use('/utenti', utentiRouters);
// app.use('/options', optionsRouter);


module.exports = app;

