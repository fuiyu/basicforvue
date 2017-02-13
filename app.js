const express = require('express');
const webpack = require('webpack')
const webpackConfig = require('./build/webpack.config')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const cookieParser = require('cookie-parser')
const webSocketServer = require('./ws_server')

const router = require('./routes').router
const compression = require("compression")
const app = express();
const keys = 'fuiyu';
var bodyParser = require('body-parser')
var webpackCompiler = webpack(webpackConfig)
// 设置 Cookie
app.use(cookieParser(keys));
app.use(compression()) //压缩头报文
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}))

// parse application/json
app.use(bodyParser.json())
// 设置 Session
const sessionStore = new RedisStore({
  host: "127.0.0.1",
  port: 6379,
  prefix: 'fuiyu:',
});
app.use(session({
  resave: true,  //每次请求都刷新session
  store: sessionStore,
  secret: keys,
  cookie: {
    maxAge: 3600000
  }
}))

router(app)
var webpackMiddleware = require('webpack-dev-middleware')(webpackCompiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }

})

app.use(webpackMiddleware);
app.use('/upload',express.static('./upload'));
app.use(function (req, res, next) {
  res.status(404).send('Not Found!');
});
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


var server = app.listen(2016, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

webSocketServer(server, sessionStore, keys)