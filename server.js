var express = require('express');
var fs = require('fs-extra');
var multer  = require('multer')

const DIRECTORY_FOR_UPLOADED_MANIFESTS = 'uploads/manifests';
var upload = multer({ dest: DIRECTORY_FOR_UPLOADED_MANIFESTS });

// Create our app
var app = express();

app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log('Express server is up on port ' + PORT);
  clearUploadedManifestsFrom(DIRECTORY_FOR_UPLOADED_MANIFESTS);
});

// manifest upload route
app.put(/manifestUpload/, upload.single('localManifestFile'), function(req, res, next) {
  fs.readFile(req.file.path, 'utf-8', function(err, data) {
    if(err) throw err;
    res.write(data);
    res.end();
  });
});

function clearUploadedManifestsFrom(dir) {
  fs.emptyDir(dir, function(err) {
    if (err) console.error('Failed to clear uploaded manifests');
  });
}
