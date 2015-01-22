var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res) {
    res.writeHead(200, { 'content-type': 'text/plain' })

    var fileStream = fs.createReadStream(process.argv[3]);
    fileStream.pipe(res);
});
server.listen(Number(process.argv[2]));