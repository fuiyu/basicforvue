class MysqlModel {
    init(conn, table) {
        this.conn = conn;
        this.table = table;
    }
    
    async create(obj) {
            return new Promise((resolve, reject) => {
                this.conn.query(`insert into ${this.table}`, obj, function(err, result) {
                    if (err) reject(err);
                    resolve(result);
                    connection.release();
                });
            })
        }
        // 
    async get(obj) {
        var query = `select * from  ${this.table} where `;
        var _container = []
        for (var prop in obj) {
            _container.push(prop + '=' + obj[prop])
        }

        query += _container.join(' and ')

        return new Promise((resolve, reject) => {
            this.conn.query(query, function(err, rows, fields) {
                if (err) reject(err);
                resolve(rows)
                connection.release();
            });
        })
    }


    async update(id, obj) {
        return new Promise((resolve, reject) => {
            this.conn.query(`update users set password="ddd" where name="zhangsan"`, obj, function(err, result) {
                if (err) reject(err);
                resolve(result);
                connection.release();
            });
        })
    }

    async del(query, obj) {
        return new Promise((resolve, reject) => {
            this.conn.query(query, obj, function(err, result) {
                if (err) reject(err);
                resolve(result);
                connection.release();
            });
        })
    }
}
module.exports = MysqlModel