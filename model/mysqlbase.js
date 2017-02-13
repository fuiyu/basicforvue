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
                if (err) {
                    console.error(err);
                    reject(err);
                };
                connection.release();
                resolve(result);
            });


        })
    }

    async get(obj) {
        var query = `select * from  ${this.table} where `;
        var _container = [],_param=[];
        for (var prop in obj) {
            _container.push(prop + '=? ')
            _param.push(obj[prop])
        }
        query += _container.join(' and ')
        var _self = this;
        return new Promise(async(resolve, reject) => {
            var connection = await _self.getConnection(_self.conn)
            connection.query(query,_param, function (err, rows, fields) {
                if (err) {
                    reject(err)
                };
                connection.release();
                resolve(rows)

            });
        })
    }


    async update(obj,source) {
        var _self = this;
        var query=`update ${this.table} SET `;
        var _container = [],_param=[];
        for (var prop in obj) {
            _container.push(prop + '=? ')
            _param.push(obj[prop])
        }
        query += _container.join(' and ')

        var _container = [];
        for (var prop in source) {
            _container.push(prop + '=? ')
            _param.push(source[prop])
        }
        query +='where '+ _container.join(' OR ')

        return new Promise(async(resolve, reject) => {
            var connection = await _self.getConnection(_self.conn)
            connection.query(query, _param, function (err, result) {
                if (err) reject(err);
                connection.release();                
                resolve(result);
            });
        })
    }

    async del(obj) {
        var query = `delete * from  ${this.table} where ?`;
        var _self = this;
        return new Promise(async(resolve, reject) => {
            var connection = await _self.getConnection(_self.conn)
            connection.query(query, obj, function (err, result) {
                if (err) {
                    console.error(err);
                    reject(err);
                }
                resolve(result);
                connection.release();
            });
        })
    }

    getConnection(conn) {
        var _self = this;
        return new Promise((resolve, reject) => {
            conn.getConnection(function (err, connection) {
                if (err) {
                    console.error(err);
                    reject(err);
                }
                resolve(connection);
            });
        })
    }
}
module.exports = MysqlModel