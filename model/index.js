const mysql = require("mysql")
// const mysqlBase = require('./mysqlbase.js')
const UserModel = require('./user')
const dbConfig = require("../config/db.config.js")
const conn = mysql.createPool(dbConfig);
console.log(dbConfig)

exports.user = new UserModel()
exports.user.init(conn,'user')