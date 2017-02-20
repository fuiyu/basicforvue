const co = require('co')
// const ws = require('ws')
const socketServer = require('socket.io')
const Cookies = require('cookies')
const cookieParser = require('cookie-parser')
const wsManager = require('./service').wsManager

module.exports = (httpServer, sessionStore, keys) => {

  const io = socketServer(httpServer)
  io.on('connection', async(socket) => {
    const cookies = new Cookies(socket.request, null)

    if (cookies.get('connect.sid')) {
      const sid = cookies.get('connect.sid').split('s%3A')[1].split('.')[0]
      var session = await wsManager.getUser(sessionStore, sid)

      if (session.userid) {
        var username = session.username
        socket.username = username
        socket.userid = session.userid
        wsManager.put(socket.username, socket)
      } else {
        socket.onclose()
      }
    } else {
      socket.onclose()
    }

  })
}