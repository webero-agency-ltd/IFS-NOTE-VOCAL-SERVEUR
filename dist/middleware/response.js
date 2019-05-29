"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = function (req, res, next) {
    var lang = req.lang();
    res.error = function (id, code, data) {
        if (code === void 0) { code = 200; }
        if (data === void 0) { data = {}; }
        return res.status(code).json({
            id: id,
            message: lang['errors'][id] ? lang['errors'][id] : id,
            data: data,
            type: 'ERROR',
        });
    };
    res.success = function (data, id) {
        if (id === void 0) { id = ''; }
        return res.status(200).json({
            id: id,
            message: lang['success'][id] ? lang['success'][id] : '',
            data: data ? data : { success: true },
        });
    };
    next();
};
