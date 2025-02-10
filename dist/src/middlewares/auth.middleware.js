"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const supabase_1 = require("../config/supabase");
const env_1 = require("../config/env");
function requireAuth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let token = '';
            // Handle token
            if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
                token = req.headers.authorization.split(' ')[1];
            }
            if (!token)
                return res.status(401).json({ message: 'Unauthorized: no token provided' });
            try {
                jsonwebtoken_1.default.verify(token, env_1.JWT_SECRET, {
                    algorithms: ['HS256'],
                    issuer: env_1.JWT_ISSUER,
                });
            }
            catch (error) {
                console.error('Token verification failed:', error);
                const errorMessage = error instanceof Error ? error.message : 'Unauthorized: invalid token';
                return res.status(401).json({ message: errorMessage });
            }
            // Check for user
            const { data: { user }, error: getUserError, } = yield supabase_1.supabase.auth.getUser(token);
            const { id } = user !== null && user !== void 0 ? user : {};
            if (getUserError || !id) {
                return res.status(401).json({ message: 'Unauthorized: error getting user' });
            }
            const { data } = yield supabase_1.supabase.from('users').select('*').eq('id', id).single();
            // Attach user and token to request
            req.user = data;
            req.token = token;
            next();
        }
        catch (error) {
            res.status(401).json({ message: 'Unauthorized' });
        }
    });
}
exports.default = requireAuth;
