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
const document_service_1 = require("../services/document.service");
const supabase_1 = require("../config/supabase");
const document_1 = require("../../__mocks__/data/document");
describe('Document Service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    const userId = 'user123';
    const documentId = '7a006236-5334-489a-ab04-776d1210c0cb';
    it('should fetch all documents for a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockSupabaseQuery = {
            select: jest.fn().mockReturnThis(),
            eq: jest.fn().mockReturnThis(),
            order: jest.fn().mockResolvedValueOnce({
                data: document_1.mockDocuments,
                error: null,
            }),
        };
        jest.spyOn(supabase_1.supabase, 'from').mockReturnValue(mockSupabaseQuery);
        const documents = yield (0, document_service_1.getDocuments)(userId);
        expect(supabase_1.supabase.from).toHaveBeenCalledWith('documents');
        expect(mockSupabaseQuery.select).toHaveBeenCalled();
        expect(mockSupabaseQuery.eq).toHaveBeenCalledWith('user_id', userId);
        expect(mockSupabaseQuery.order).toHaveBeenCalledWith('created_at', { ascending: false });
        expect(documents).toEqual(document_1.mockDocuments);
    }));
    it('should fetch a single document by ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockSupabaseQuery = {
            select: jest.fn().mockReturnThis(),
            eq: jest.fn().mockReturnThis(),
            single: jest.fn().mockResolvedValueOnce({
                data: document_1.mockDocuments[0],
                error: null,
            }),
        };
        jest.spyOn(supabase_1.supabase, 'from').mockReturnValue(mockSupabaseQuery);
        const document = yield (0, document_service_1.getDocument)(userId, documentId);
        expect(supabase_1.supabase.from).toHaveBeenCalledWith('documents');
        expect(mockSupabaseQuery.select).toHaveBeenCalled();
        expect(mockSupabaseQuery.eq).toHaveBeenCalledWith('id', documentId);
        expect(mockSupabaseQuery.eq).toHaveBeenCalledWith('user_id', userId);
        expect(document).toEqual(document_1.mockDocuments[0]);
    }));
    it('should throw an error if fetching documents fails', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockSupabaseQuery = {
            select: jest.fn().mockReturnThis(),
            eq: jest.fn().mockReturnThis(),
            order: jest.fn().mockResolvedValueOnce({
                data: null,
                error: { message: 'Database error' },
            }),
        };
        jest.spyOn(supabase_1.supabase, 'from').mockReturnValue(mockSupabaseQuery);
        yield expect((0, document_service_1.getDocuments)(userId)).rejects.toThrow('Database error');
        expect(supabase_1.supabase.from).toHaveBeenCalledWith('documents');
        expect(mockSupabaseQuery.select).toHaveBeenCalled();
        expect(mockSupabaseQuery.eq).toHaveBeenCalledWith('user_id', userId);
        expect(mockSupabaseQuery.order).toHaveBeenCalledWith('created_at', { ascending: false });
    }));
});
