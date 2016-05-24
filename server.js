var express = require('express');

// Create our app
var app = express();

app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log('Express server is up on port ' + PORT);
});
