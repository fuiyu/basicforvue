class WSManager {
    constructor() {
        // Map compare to Object 
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#Object_and_maps_compared/
        // Map作用跟Object相似
        this.wsMap = new Map()
    }
    async getUser(sessionStore,sid) {
        return new Promise((resolve, reject) => {
            sessionStore.get(sid, function (err, result) {
                if (err) {
                    reject(err);
                };
                resolve(result)
            })
        })
    }
    put(username, ws) {
        let ary = this.wsMap[username]
        console.log("ws", username)

        if (ary == null) {
            ary = this.wsMap[username] = []
        }
        ary.push(ws)
    }
    remove(username, ws) {
        let ary = this.wsMap[username]
        if (ary == null) return
        console.log(ary)
        let index = ary.indexOf(ws)
        if (index >= 0) {
            ary.splice(index, 1)
        }
        return ary
    }
    // send(124,{})
    send(username, message) {
        let ary = this.wsMap[username]
        if (ary) {
            for (let ws of ary) {
                ws.send(JSON.stringify(message), {
                    mark: true
                })
            }
        }
    }
}
module.exports = WSManager