const co = require('co')
const ws = require('ws')
const Cookies = require('cookies')
const cookieParser = require('cookie-parser')
const wsManager = require('./service').wsManager
module.exports = (httpServer, sessionStore, keys) => {
  const wss = ws.createServer({
    server: httpServer
  })

  wss.on('connection', async(ws) => {
    const cookies = new Cookies(ws.upgradeReq, null)
    const sid = cookies.get('connect.sid').split('s%3A')[1].split('.')[0]
    // console.log('cookies',cookies)
    console.log(wsManager.getUser)
    var session = await wsManager.getUser(sessionStore,sid)
    ws.username = session.username
    ws.on('message', (message) => {

      wsManager.emit(ws.userId, message)
    })

    ws.on('close', () => {
      wsManager.remove(ws.userId, ws)
    })
  })
}