const express = require('express');
const webpack = require('webpack')
const webpackConfig = require('./build/webpack.config')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
var cookieParser = require('cookie-parser')
const router = require('./routes').router
const compression = require("compression")
const app = express();
var bodyParser = require('body-parser')
var webpackCompiler = webpack(webpackConfig)
// 设置 Cookie
// app.use(cookieParser('fuiyu'));
app.use(compression())//压缩头报文
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
// 设置 Session
app.use(session({
	store: new RedisStore({
		host: "127.0.0.1",
		port: 6379,
    ttl: 60 * 60 * 24 * 30,
    prefix:'fuiyu:'
	}),
	secret: 'fuiyu',
  cookie:{maxAge: 60000}
}))

var webpackMiddleware = require('webpack-dev-middleware')(webpackCompiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
        colors: true,
        chunks: false
    }
    
})
router(app)
app.use(webpackMiddleware);

app.use(function(req, res, next) {
  res.status(404).send('Not Found!');
});
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
var server = app.listen(2016, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});