const mysql = require("mysql")
// const mysqlBase = require('./mysqlbase.js')
const UserModel = require('./user')
const ChatRoomModel = require('./chatroom')
const ChatContentModel = require('./chatcontent')
const dbConfig = require("../config/db.config.js")
const conn = mysql.createPool(dbConfig);


exports.user = new UserModel()
exports.chatRoom = new ChatRoomModel()
exports.chatContent = new ChatContentModel()

exports.user.init(conn,'user')
exports.chatRoom.init(conn,'chat_room')
exports.chatContent.init(conn,'chat_content')