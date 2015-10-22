var express = require('express');
var app = express();

app.use(express.static('public'));

if (require.main === module) {
  app.listen(3000);
}

module.exports = app;
