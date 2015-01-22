var bl = require('bl');

module.exports = {
    printHttpResponse: function(response, callback) {
        response.pipe(bl(function(err, data) {
            if(err) {
                return console.error('An error occured : ' + err);
            }
            console.log(data.toString());

            if(callback) {
                callback();
            }
        }));
    }
};