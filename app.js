const express = require('express');
const app = express();

app.use('/', express.static('public'));

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