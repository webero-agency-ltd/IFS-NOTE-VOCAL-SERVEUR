"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function paginate(_array, page_size, page_number) {
    --page_number;
    return {
        data: _array.slice(page_number * page_size, (page_number + 1) * page_size),
        total: _array.length,
        maxpage: Math.ceil((_array.length / page_size)),
    };
}
exports.default = paginate;
