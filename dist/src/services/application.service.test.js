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
const application_service_1 = require("../services/application.service");
const supabase_1 = require("../config/supabase");
const application_1 = require("../../__mocks__/data/application");
describe('Application Service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    const userId = 'user123';
    const applicationId = '1675cad0-41d4-429a-97a9-c7964ea4692e';
    it('should fetch all applications for a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockSupabaseQuery = {
            select: jest.fn().mockReturnThis(),
            eq: jest.fn().mockReturnThis(),
            order: jest.fn().mockResolvedValueOnce({
                data: application_1.mockApplications,
                error: null,
            }),
        };
        jest.spyOn(supabase_1.supabase, 'from').mockReturnValue(mockSupabaseQuery);
        const applications = yield (0, application_service_1.getApplications)(userId);
        expect(supabase_1.supabase.from).toHaveBeenCalledWith('applications');
        expect(mockSupabaseQuery.select).toHaveBeenCalled();
        expect(mockSupabaseQuery.eq).toHaveBeenCalledWith('user_id', userId);
        expect(mockSupabaseQuery.order).toHaveBeenCalledWith('created_at', { ascending: false });
        expect(applications).toEqual(application_1.mockApplications);
    }));
    it('should fetch a single application by ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockSupabaseQuery = {
            select: jest.fn().mockReturnThis(),
            eq: jest.fn().mockReturnThis(),
            single: jest.fn().mockResolvedValueOnce({
                data: application_1.mockApplications[0],
                error: null,
            }),
        };
        jest.spyOn(supabase_1.supabase, 'from').mockReturnValue(mockSupabaseQuery);
        const application = yield (0, application_service_1.getApplication)(userId, applicationId);
        expect(supabase_1.supabase.from).toHaveBeenCalledWith('applications');
        expect(mockSupabaseQuery.select).toHaveBeenCalled();
        expect(mockSupabaseQuery.eq).toHaveBeenCalledWith('id', applicationId);
        expect(mockSupabaseQuery.eq).toHaveBeenCalledWith('user_id', userId);
        expect(application).toEqual(application_1.mockApplications[0]);
    }));
    it('should throw an error if fetching applications fails', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockSupabaseQuery = {
            select: jest.fn().mockReturnThis(),
            eq: jest.fn().mockReturnThis(),
            order: jest.fn().mockResolvedValueOnce({
                data: null,
                error: { message: 'Database error' },
            }),
        };
        jest.spyOn(supabase_1.supabase, 'from').mockReturnValue(mockSupabaseQuery);
        yield expect((0, application_service_1.getApplications)(userId)).rejects.toThrow('Database error');
        expect(supabase_1.supabase.from).toHaveBeenCalledWith('applications');
        expect(mockSupabaseQuery.select).toHaveBeenCalled();
        expect(mockSupabaseQuery.eq).toHaveBeenCalledWith('user_id', userId);
        expect(mockSupabaseQuery.order).toHaveBeenCalledWith('created_at', { ascending: false });
    }));
});
