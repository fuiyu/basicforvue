class transceiver {
    constructor(wsManager){
        this.wsManager=wsManager;
    }

    async sendToUser(username,message){
        this.wsManager.send(username, message)
    }
}


module.exports = transceiver