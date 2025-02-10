"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const application_controller_1 = require("../controllers/application.controller");
const express_1 = require("express");
const applicationsRouter = (0, express_1.Router)();
applicationsRouter.get('/', application_controller_1.getApplications);
applicationsRouter.get('/:applicationId', application_controller_1.getApplication);
exports.default = applicationsRouter;
