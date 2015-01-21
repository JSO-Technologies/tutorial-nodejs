/**
 * First version, without third party libs
 */
/*
var http = require('http');
var responseData = '';

http.get(process.argv[2], function (response) {
    response.setEncoding('utf8')
    response.on('data', function(data) {
        responseData += data.toString();
    });
    response.on('end', function() {
        console.log(responseData.length);
        console.log(responseData);
    })
    response.on('error', console.error)
});
*/

/**
 * Second version, with bl lib
 */
var bl = require('bl');
var http = require('http');

http.get(process.argv[2], function(response) {
    response.pipe(bl(function(err, data) {
        if(err) {
            return console.error('An error occured : ' + err);
        }
        console.log(data.length);
        console.log(data.toString());
    }));
});