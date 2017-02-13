const MysqlModel = require('./mysqlbase')

class chatContentModel extends MysqlModel {
    init(conn, table) {
        this.conn = conn;
        this.table = table;
    }
    // 分页查询
    async getContentPage(obj,pn=1,ps=5) {
        var query = `select content,create_date,user,userid from ${this.table} where `;
        var _container = [],
            _param = [];
        for (var prop in obj) {
            _container.push(prop + '=? ')
            _param.push(obj[prop])
        }
        query += _container.join(' and ')
        query += 'limit '+ps*(pn-1)+','+pn*ps;
        var total =await this.getCountPage(obj)
        var _self = this;
        return new Promise(async(resolve, reject) => {
            var connection = await _self.getConnection(_self.conn)
            connection.query(query, _param, function (err, rows, fields) {
                if (err) {
                    reject(err)
                };
                connection.release();
                resolve({rows:rows,total:total[0].total,pn:pn,ps:ps})

            });
        })
    }

    async getCountPage(obj){
         var query = `select count(*) as total from ${this.table} where `;
        var _container = [],
            _param = [];
        for (var prop in obj) {
            _container.push(prop + '=? ')
            _param.push(obj[prop])
        }
        query += _container.join(' and ')
        var _self = this;
        return new Promise(async(resolve, reject) => {
            var connection = await _self.getConnection(_self.conn)
            connection.query(query, _param, function (err, rows, fields) {
                if (err) {
                    reject(err)
                };
                connection.release();
                resolve(rows)

            });
        })
    }

}

module.exports = chatContentModel