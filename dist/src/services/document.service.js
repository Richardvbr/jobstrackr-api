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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDocuments = getDocuments;
exports.getDocument = getDocument;
exports.addDocument = addDocument;
const uuid_1 = require("uuid");
const supabase_1 = require("../config/supabase");
function getDocuments(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield supabase_1.supabase
            .from('documents')
            .select()
            .eq('user_id', userId)
            .order('created_at', { ascending: false });
        if (error) {
            throw new Error(error.message);
        }
        return data;
    });
}
function getDocument(userId, documentId) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield supabase_1.supabase
            .from('documents')
            .select()
            .eq('id', documentId)
            .eq('user_id', userId)
            .single();
        if (error) {
            throw new Error(error.message);
        }
        return data;
    });
}
function addDocument(userId, body) {
    return __awaiter(this, void 0, void 0, function* () {
        const uniqueId = (0, uuid_1.v4)();
        const { documentDescription, documentName, selectedApplication, file } = body;
        // upload file
        const { data: fileData, error: fileError } = yield supabase_1.supabase.storage
            .from('documents')
            .upload(`file-${documentName}-${uniqueId}`, file);
        // Create record with path to file
        const { error } = yield supabase_1.supabase.from('documents').insert(Object.assign({ user_id: userId, title: documentName, description: documentDescription, file_path: fileData === null || fileData === void 0 ? void 0 : fileData.path, file_type: file.type }, (selectedApplication && { application_id: selectedApplication })));
        if (error) {
            throw new Error(error.message);
        }
        return fileData;
    });
}
