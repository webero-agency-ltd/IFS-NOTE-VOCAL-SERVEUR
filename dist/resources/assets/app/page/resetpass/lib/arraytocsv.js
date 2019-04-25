"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var arraytocsv = /** @class */ (function () {
    function arraytocsv(args, stockData) {
        var data, filename, link;
        var csv = this.convertArrayOfObjectsToCSV({
            data: stockData
        });
        if (csv == null)
            return;
        filename = args.filename || 'export.csv';
        if (!csv.match(/^data:text\/csv/i)) {
            csv = 'data:text/csv;charset=utf-8,' + csv;
        }
        data = encodeURI(csv);
        var element = document.createElement('a');
        element.setAttribute('href', csv);
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }
    arraytocsv.prototype.convertArrayOfObjectsToCSV = function (args) {
        var result, ctr, keys, columnDelimiter, lineDelimiter, data;
        data = args.data || null;
        if (data == null || !data.length) {
            return null;
        }
        columnDelimiter = args.columnDelimiter || ',';
        lineDelimiter = args.lineDelimiter || '\n';
        keys = Object.keys(data[0]);
        result = '';
        result += keys.join(columnDelimiter);
        result += lineDelimiter;
        data.forEach(function (item) {
            ctr = 0;
            keys.forEach(function (key) {
                if (ctr > 0)
                    result += columnDelimiter;
                result += item[key];
                ctr++;
            });
            result += lineDelimiter;
        });
        return result;
    };
    return arraytocsv;
}());
exports.default = arraytocsv;
