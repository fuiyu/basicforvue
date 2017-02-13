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

    async createUser(obj) {
        var _self = this;
        return new Promise(async(resolve, reject) => {
            var connection = await _self.getConnection(_self.conn)
            var chkExist = await _self.get({
                name: obj.name
            })
            if (chkExist.length > 0) {
                resolve('用户名已存在');
            } else {
                connection.query(`insert into ${_self.table} SET ?`, obj, function (err, result) {
                    if (err) {
                        console.error(err) ;
                        reject(err);
                    };
                    connection.release();
                    resolve(result);
                });
            }

        })
    }
}

module.exports = UserModel
