module.exports = function json(data, place) {
    if (place === void 0) { place = {}; }
    var jsont;
    try {
        jsont = JSON.parse(data);
    }
    catch (e) {
        jsont = place;
    }
    return jsont;
};
