class MysqlModel {
    init(conn, table) {
        this.conn = conn;
        this.table = table;
    }
    
    async create(obj) {
        var _self = this;
        return new Promise(async(resolve, reject) => {
            var connection = await _self.getConnection(_self.conn)
            connection.query(`insert into ${_self.table} SET ?`, obj, function (err, result) {
                if (err) reject(err);
                connection.release();
                resolve(result);
            });
        })
    }
    
    async get(obj) {
        var query = `select * from  ${this.table} where `;
        var _container = []
        for (var prop in obj) {
            _container.push(prop + '=' + obj[prop])
        }
        query += _container.join(' and ')
        console.log(query)
        var _self = this;
        return new Promise(async(resolve, reject) => {
            var connection = await _self.getConnection(_self.conn)
            connection.query(query, function (err, rows, fields) {
                if (err) reject(err);
                connection.release();
                resolve(rows)
                
            });
        })
    }


    // async update(id, obj) {
    //     var _container = [],query=''
    //     for (var prop in id) {
    //         _container.push(prop + '=' + id[prop])
    //     }
    //     query += _container.join(' and ')
    //     return new Promise((resolve, reject) => {
    //         this.conn.query(`update users set password="ddd" where name="zhangsan"`, obj, function (err, result) {
    //             if (err) reject(err);
    //             resolve(result);
    //             connection.release();
    //         });
    //     })
    // }

    async del(obj) {
         var _self = this;
        return new Promise(async(resolve, reject) => {
            var connection = await _self.getConnection(_self.conn)
            connection.query(query, obj, function (err, result) {
                if (err) reject(err);
                resolve(result);
                connection.release();
            });
        })
    }

    getConnection(conn) {
         var _self = this;
        return new Promise((resolve, reject) => {
            conn.getConnection(function (err, connection) {
                if (err) reject(err);
                resolve(connection);
            });
        })
    }
}
module.exports = MysqlModel