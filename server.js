var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

http.createServer(function (req, res) {
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;

    // Default to index.html
    if (filename == './') {
        filename = './index.html';
    }

    var extname = path.extname(filename);
    var contentType = 'text/html';

    // Set content type based on file extension
    switch (extname) {
        case '.jpg':
        case '.jpeg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        // Add other content types for different file extensions as needed
    }

    fs.readFile(filename, function(err, data) {
        if (err) {
            if (err.code == 'ENOENT') {
                res.writeHead(404, {'Content-Type': 'text/html'});
                return res.end("404 Not Found");
            }
            res.writeHead(500);
            return res.end('Error loading the file');
        }
        res.writeHead(200, {'Content-Type': contentType});
        res.write(data);
        return res.end();
    });
}).listen(8080);

console.log("Server listening on port 8080...");
