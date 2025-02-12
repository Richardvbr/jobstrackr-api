"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const document_controller_1 = require("../controllers/document.controller");
const documentsRoute = (0, express_1.Router)();
documentsRoute.get('/', document_controller_1.getDocuments);
documentsRoute.get('/:documentId', document_controller_1.getDocument);
documentsRoute.post('/', document_controller_1.addDocument);
exports.default = documentsRoute;
