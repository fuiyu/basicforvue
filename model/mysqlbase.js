const mysql = require("mysql")
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '7569823',
    database:'nodejs',
    port: 3306
});
conn.connect();
await conn.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
    if (err) throw err;
    console.log('The solution is: ', rows[0].solution);
});
conn.end();