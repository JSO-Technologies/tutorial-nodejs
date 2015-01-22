var http = require('http');
var url = require('url');
var querystring = require('querystring');

/**
 * Reject a request with provided status and body response
 * @param res - http response
 * @param status - http status
 * @param body - plain text body
 */
var reject = function(res, status, body) {
    res.writeHead(status, { 'content-type': 'text/plain' });
    res.write(body);
};

/**
 * Accept a request with provided status and body response
 * @param res - http response
 * @param status - http status
 * @param body - json response body
 */
var accept = function(res, status, body) {
    res.writeHead(status, { 'content-type': 'application/json' });
    res.write(JSON.stringify(body));
    res.end();
}

/**
 * Handle parse time request
 * @param res - http response
 * @param query - query params
 */
var handleParseTime = function(res, query) {
    if(! query.iso) {
        reject(res, 400, 'Query param \'iso\' not found');
        return;
    }

    var date = new Date(query.iso);
    if(! date || isNaN(date.getTime())) {
        reject(res, 400, 'Invalid query param \'iso\'');
        return;
    }

    var body = {
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds()
    };
    accept(res, 200, body);
};

/**
 * Handle time parse request
 * @param res - http response
 */
var handleUnixTime = function (res) {
    var body = {unixtime: new Date().getTime()};
    accept(res, 200, body);
};

/**
 * Server
 * Accept only GET on /api/parsetime and /api/unixtime
 */
var server = http.createServer(function(req, res) {

    if(req.method != 'GET') {
        reject(res, 404, 'Service not found');
    }
    else {
        var parsedUrl = url.parse(req.url, false);
        switch (parsedUrl.pathname) {
            case '/api/parsetime':
                handleParseTime(res, querystring.parse(parsedUrl.query));
                break;
            case '/api/unixtime':
                handleUnixTime(res);
                break;
            default:
                reject(res, 404, 'Service not found');
                break;
        }
    }
    res.end();

});

server.listen(Number(process.argv[2]));

/**
 * Official solution
 */
/*
var http = require('http')
var url = require('url')

function parsetime (time) {
    return {
        hour: time.getHours(),
        minute: time.getMinutes(),
        second: time.getSeconds()
    }
}

function unixtime (time) {
    return { unixtime : time.getTime() }
}

var server = http.createServer(function (req, res) {
    var parsedUrl = url.parse(req.url, true)
    var time = new Date(parsedUrl.query.iso)
    var result

    if (/^\/api\/parsetime/.test(req.url))
        result = parsetime(time)
    else if (/^\/api\/unixtime/.test(req.url))
        result = unixtime(time)

    if (result) {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(result))
    } else {
        res.writeHead(404)
        res.end()
    }
})
server.listen(Number(process.argv[2]))
*/
