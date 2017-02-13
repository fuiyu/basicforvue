class WSManager {
    constructor() {
        // Map compare to Object 
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#Object_and_maps_compared/
        // Map作用跟Object相似
        this.wsMap = new Map()
    }
    async getUser(sessionStore, sid) {
        return new Promise((resolve, reject) => {
            sessionStore.get(sid, function (err, result) {
                if (err) {
                    console.error(err)
                    reject(err);
                };
                resolve(result)
            })
        })
    }
    put(username, socket) {
        if (!!username) {
            let ary = this.wsMap[username]

            if (ary == null) {
                ary = this.wsMap[username] = []
            }
            ary.push(socket)
        }
    }
    remove(username, socket) {
        let ary = this.wsMap[username]
        if (ary == null) return

        let index = ary.indexOf(socket)
        if (index >= 0) {
            ary.splice(index, 1)
        }
        return ary
    }
    // send(124,{})
    send(userlist, message) {
        if (userlist.length > 0) {
            for (var i = 0; i < userlist.length; i++　) {
                let ary = this.wsMap[userlist[i]]
                if (ary) {
                    // 改redis存储可并发
                    for (let socket of ary) {
                        socket.emit('sendMsm', message)
                    }
                }
            }
            return true
        }else{
            return false;
        }
    }
}
module.exports = WSManager