"use strict";
var _a;
var _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CORS_WHITELIST = exports.EMAILJS_PK = exports.EMAILJS_TEMPLATE_ID = exports.EMAILJS_SERVICE_ID = exports.OTP_EMAIL_REDIRECT = exports.SUPABASE_ANON_KEY = exports.SUPABASE_SERVICE_KEY = exports.SUPABASE_URL = exports.JWT_ISSUER = exports.JWT_EXPIRES_IN = exports.JWT_SECRET = exports.NODE_ENV = exports.PORT = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: `.env.${(_b = process.env.NODE_ENV) !== null && _b !== void 0 ? _b : 'development'}.local` });
_a = process.env, exports.PORT = _a.PORT, exports.NODE_ENV = _a.NODE_ENV, exports.JWT_SECRET = _a.JWT_SECRET, exports.JWT_EXPIRES_IN = _a.JWT_EXPIRES_IN, exports.JWT_ISSUER = _a.JWT_ISSUER, exports.SUPABASE_URL = _a.SUPABASE_URL, exports.SUPABASE_SERVICE_KEY = _a.SUPABASE_SERVICE_KEY, exports.SUPABASE_ANON_KEY = _a.SUPABASE_ANON_KEY, exports.OTP_EMAIL_REDIRECT = _a.OTP_EMAIL_REDIRECT, exports.EMAILJS_SERVICE_ID = _a.EMAILJS_SERVICE_ID, exports.EMAILJS_TEMPLATE_ID = _a.EMAILJS_TEMPLATE_ID, exports.EMAILJS_PK = _a.EMAILJS_PK, exports.CORS_WHITELIST = _a.CORS_WHITELIST;
