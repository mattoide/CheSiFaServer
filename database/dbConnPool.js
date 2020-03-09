var mysql     =    require('mysql');

var pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'root',
    password : '0000',
    database : 'chesifa',
    debug    :  false
});

module.exports = pool;