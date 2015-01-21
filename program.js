var fs = require('fs');
var dirPath = process.argv[2];
var filter = process.argv[3];

String.prototype.endsWith = function(endStr) {
    return this.indexOf(endStr, this.length - endStr.length) !== -1;
}

fs.readdir(dirPath, function(err, list) {
    var extension = '.' + filter;

    list.forEach(function(dir) {
        if(dir.endsWith(extension)) {
            console.log(dir);
        }
    });
});

/*
// Official Response
var fs = require('fs')
var path = require('path')

fs.readdir(process.argv[2], function (err, list) {
    list.forEach(function (file) {
        if (path.extname(file) === '.' + process.argv[3])
            console.log(file)
    })
})
$/