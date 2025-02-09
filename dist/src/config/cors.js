"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = void 0;
const whitelist = [
    'http://localhost:3000',
    'http://localhost:4000',
    'https://portal.jobstrackr.app',
    'https://jobstrackr-vite.pages.dev',
];
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
