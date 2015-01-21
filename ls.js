var fs = require('fs');
var path = require('path');

var listAndfilter = function(dirname, extension, callback) {
    fs.readdir(dirname, function(err, list) {
        if(err) {
            callback(err);
        }
        else {
            var filteredList = list.filter(function(file) {
                return path.extname(file) === '.' + extension;
            });
            callback(null, filteredList);
        }
    })
};

module.exports = listAndfilter;