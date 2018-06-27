var formidable = require('formidable'),
    http = require('http'),
    util = require('util');
    port = 8082;

http.createServer(function(req, res) {
  if (req.url == '/upload' && req.method.toLowerCase() == 'post' || req.method.toLowerCase() == 'options') {
    console.log('received post: uploading...');
    // parse a file upload
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = "./testup";
    form.keepExtensions = true;
    form.type = 'multipart';
    form.on("fileBegin", (name, file) => {
        // file.path = path.join(__dirname, "testup", file.name);
    });

    form.parse(req, function(err, fields, files) {
      if (err) {
        console.error('form.parse: ', err);
      } else {
        res.writeHead(200, {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST,GET",
            'content-type': 'text/plain'
        });
        res.write('received upload:\n\n');
        res.end(util.inspect({fields: fields, files: files}));
      }
      
    });

    console.log(form);

    return;
  } else {
    console.log('not post');

    // show error
    res.writeHead(404, {'content-type': 'text/html'});
    res.end(
      '<h3>Post not received</h3>'
    );
  }

  
  
}).listen(port);

console.log('listening on port: '+port);