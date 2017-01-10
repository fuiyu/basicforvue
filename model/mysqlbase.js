const mysql = require("mysql")
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '7569823',
    port: 3306
});
conn.connect();
async function connectDatbase(query){
    return new Promise((resolve,reject)=>{
        conn.query(query, function(err, rows, fields) {
            if (err) console.log(err) ;
                 console.log('The solution is: ', rows);
                 resolve()
            });
    })
}
async function commit(){
    console.log('执行数据库')
    await connectDatbase('SELECT 1 + 1 AS solution')
    console.log("执行完毕")
}
commit()
conn.end();

async function sleep(timeout) {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      resolve();
    }, timeout);
  });
}

(async function() {
  console.log('Do some thing, ' + new Date());
  await sleep(3000);
  console.log('Do other things, ' + new Date());
})();

class mysqlbase{
    constructor(){
        
    }
}