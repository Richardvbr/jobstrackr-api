"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorMiddleware(err, req, res, next) {
    var _a;
    try {
        const error = Object.assign(Object.assign({}, err), { message: err.message });
        console.error(err);
        res.status((_a = error.statusCode) !== null && _a !== void 0 ? _a : 500).json({
            success: false,
            error: error.message || 'Server Error',
        });
    }
    catch (error) {
        next(error);
    }
}
exports.default = errorMiddleware;
