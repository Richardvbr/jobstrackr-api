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
const supabase_1 = require("../config/supabase");
function getApplications() {
    return __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield supabase_1.supabase
            .from('applications')
            .select()
            .order('created_at', { ascending: false });
        if (error) {
            throw new Error(error.message);
        }
        return data;
    });
}
function getApplication(req) {
    return __awaiter(this, void 0, void 0, function* () {
        const applicationId = req.params.applicationId;
        const { data, error } = yield supabase_1.supabase
            .from('applications')
            .select()
            .eq('id', applicationId)
            .single();
        if (error) {
            throw new Error(error.message);
        }
        return data;
    });
}
