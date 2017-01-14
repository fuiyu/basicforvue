const MysqlModel = require('./mysqlbase')

class UserModel extends MysqlModel{
    init(conn, table) {
        this.conn = conn;
        this.table = table;
    }

    async getIdByNickName(name){
        const obj = await this.get({"name":name})
        
        return obj 
    }
}

module.exports = UserModel
