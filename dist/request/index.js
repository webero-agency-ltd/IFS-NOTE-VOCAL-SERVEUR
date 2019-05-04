var costvalidate = require('validate.js');
//validation des formulaires a partire des controllers 
module.exports = function (body, rull) {
    var constraints = require('./' + rull);
    var checked = costvalidate(body, constraints);
    if (checked && Object.keys(checked).length > 0) {
        return checked;
    }
    else {
        return true;
    }
};
