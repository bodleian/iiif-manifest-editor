var express = require('express');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/manifests' })
var fs = require('fs');

// Create our app
var app = express();

app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log('Express server is up on port ' + PORT);
});

// manifest upload route
app.put(/manifestUpload/, upload.single('localManifestFile'), function(req, res, next) {
  fs.readFile(req.file.path, 'utf-8', function(err, data) {
    if(err) throw err;
    res.write(data);
    res.end();
  });
});
