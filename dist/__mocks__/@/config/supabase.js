"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabase = void 0;
// Mocked supabase client
exports.supabase = {
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    order: jest.fn().mockReturnThis(),
    single: jest.fn(),
    mockResolvedValueOnce: jest.fn(),
};
