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
exports.getApplications = getApplications;
exports.getApplication = getApplication;
exports.updateApplication = updateApplication;
exports.newApplication = newApplication;
exports.deleteApplication = deleteApplication;
const supabase_1 = require("../config/supabase");
function getApplications(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield supabase_1.supabase
            .from('applications')
            .select()
            .eq('user_id', userId)
            .order('created_at', { ascending: false });
        if (error) {
            throw new Error(error.message);
        }
        return data;
    });
}
function getApplication(userId, applicationId) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield supabase_1.supabase
            .from('applications')
            .select()
            .eq('id', applicationId)
            .eq('user_id', userId)
            .single();
        if (error) {
            throw new Error(error.message);
        }
        return data;
    });
}
function updateApplication(userId, applicationId, application) {
    return __awaiter(this, void 0, void 0, function* () {
        const { error, data } = yield supabase_1.supabase
            .from('applications')
            .update(application)
            .eq('id', applicationId)
            .eq('user_id', userId)
            .select();
        if (error) {
            throw new Error(error.message);
        }
        return data;
    });
}
function newApplication(userId, application) {
    return __awaiter(this, void 0, void 0, function* () {
        const { error, data } = yield supabase_1.supabase
            .from('applications')
            .insert(Object.assign(Object.assign({}, application), { user_id: userId }))
            .select();
        if (error) {
            throw new Error(error.message);
        }
        return data;
    });
}
function deleteApplication(userId, applicationId) {
    return __awaiter(this, void 0, void 0, function* () {
        const { error, data } = yield supabase_1.supabase
            .from('applications')
            .delete()
            .eq('id', applicationId)
            .eq('user_id', userId)
            .select();
        if (error) {
            throw new Error(error.message);
        }
        return data;
    });
}
