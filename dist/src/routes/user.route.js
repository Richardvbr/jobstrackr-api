"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("@/middlewares/auth.middleware"));
const user_controller_1 = require("@/controllers/user.controller");
const userRouter = (0, express_1.Router)();
userRouter.get('/', auth_middleware_1.default, user_controller_1.getUsers);
userRouter.get('/:id', auth_middleware_1.default, user_controller_1.getUser);
exports.default = userRouter;
