const MysqlModel = require('./mysqlbase')

class chatRoomModel extends MysqlModel{
    init(conn, table) {
        this.conn = conn;
        this.table = table;
    }
    
   
   
}

module.exports = chatRoomModel
