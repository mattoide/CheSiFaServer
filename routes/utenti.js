const express = require('express')
const router = express.Router()
const mysql = require('mysql');
const fs = require('fs');


const pool = require('../database/dbConnPool')

router.post('/registraUtente', function (req, res) {

})


router.post('/getInviti', function (req, res) {

  let buff;
  let base64data;
  let inviti = [];

  fs.readdir('./inviti', function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    files.forEach(function (file) {
        buff = fs.readFileSync('./inviti/' + file);
        base64data = buff.toString('base64');
        inviti.push({username: file, video: base64data})

    });

    return res.json(inviti)
  });

})



router.post('/caricaInvito', function (req, res) {

  let invito = req.body.invito;

  let insertQuery = 'INSERT INTO ?? (??,??,??) VALUES (?,?,?)';

  let query = mysql.format(insertQuery, ["utenti", "utente", "invito", "validita", invito.utente, invito.utente, '000000000000']);

  pool.query(query, (err, response) => {

    if (err) {  
      return res.status(500).send({ type: err.code, msg: err.message })
    }

    invito.base64 = invito.base64.replace(/^data:(.*?);base64,/, ""); // <--- make it any type
    invito.base64 = invito.base64.replace(/ /g, '+'); // <--- this is important

    fs.writeFile('./inviti/' + invito.utente + '.mp4', invito.base64, 'base64', function (err) {

      if (err) {
        return res.status(500).send({ type: err.code, msg: err.message })
      }


    });

    return res.json("Invito inserito correttamente");


  })
})

module.exports = router;