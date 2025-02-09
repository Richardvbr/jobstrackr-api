"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = void 0;
const env_1 = require("./env");
const whitelist = env_1.CORS_WHITELIST.split(',');
exports.corsOptions = {
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    origin: function (origin, callback) {
        if (whitelist.includes(origin) || !origin) {
            callback(null, true);
        }
        else {
            console.log('origin:', origin, 'not allowed');
            callback(new Error('Not allowed by CORS'));
        }
    },
};
