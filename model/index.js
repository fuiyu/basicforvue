const mysql = require("mysql")
// const mysqlBase = require('./mysqlbase.js')
const userModel = require('./user')
const dbConfig = require("../config/db.config.js")
const conn = mysql.createPool(dbConfig);

exports.user = new userModel()

exports.user.init(conn,'user')