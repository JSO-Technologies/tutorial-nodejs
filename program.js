var printer = require('./printer');
var http = require('http');

var self = this;
var getAndPrintHttpResource = function(url, callback) {
    http.get(url, function(response) {
        printer.printHttpResponse(response, callback);
    });
};

getAndPrintHttpResource(process.argv[2],
    getAndPrintHttpResource.bind(self, process.argv[3],
        getAndPrintHttpResource.bind(self, process.argv[4])));

/**
 Official response
 */
/*
var http = require('http')
var bl = require('bl')
var results = []
var count = 0

function printResults () {
    for (var i = 0; i < 3; i++)
        console.log(results[i])
}

function httpGet (index) {
    http.get(process.argv[2 + index], function (response) {
        response.pipe(bl(function (err, data) {
            if (err)
                return console.error(err)

            results[index] = data.toString()
            count++

            if (count == 3)
                printResults()
        }))
    })
}

for (var i = 0; i < 3; i++)
    httpGet(i)
*/