import { getDocuments, getDocument } from '@/services/document.service';
import { supabase } from '@/config/supabase';
import { mockDocuments } from '../../__mocks__/data/document';

describe('Document Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const userId = 'user123';
  const documentId = '7a006236-5334-489a-ab04-776d1210c0cb';

  it('should fetch all documents for a user', async () => {
    const mockSupabaseQuery = {
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      order: jest.fn().mockResolvedValueOnce({
        data: mockDocuments,
        error: null,
      }),
    };

    jest.spyOn(supabase, 'from').mockReturnValue(mockSupabaseQuery);

    const documents = await getDocuments(userId);

    expect(supabase.from).toHaveBeenCalledWith('documents');
    expect(mockSupabaseQuery.select).toHaveBeenCalled();
    expect(mockSupabaseQuery.eq).toHaveBeenCalledWith('user_id', userId);
    expect(mockSupabaseQuery.order).toHaveBeenCalledWith('created_at', { ascending: false });
    expect(documents).toEqual(mockDocuments);
  });

  it('should fetch a single document by ID', async () => {
    const mockSupabaseQuery = {
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValueOnce({
        data: mockDocuments[0],
        error: null,
      }),
    };

    jest.spyOn(supabase, 'from').mockReturnValue(mockSupabaseQuery);

    const document = await getDocument(userId, documentId);

    expect(supabase.from).toHaveBeenCalledWith('documents');
    expect(mockSupabaseQuery.select).toHaveBeenCalled();
    expect(mockSupabaseQuery.eq).toHaveBeenCalledWith('id', documentId);
    expect(mockSupabaseQuery.eq).toHaveBeenCalledWith('user_id', userId);
    expect(document).toEqual(mockDocuments[0]);
  });

  it('should throw an error if fetching documents fails', async () => {
    const mockSupabaseQuery = {
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      order: jest.fn().mockResolvedValueOnce({
        data: null,
        error: { message: 'Database error' },
      }),
    };

    jest.spyOn(supabase, 'from').mockReturnValue(mockSupabaseQuery);

    await expect(getDocuments(userId)).rejects.toThrow('Database error');

    expect(supabase.from).toHaveBeenCalledWith('documents');
    expect(mockSupabaseQuery.select).toHaveBeenCalled();
    expect(mockSupabaseQuery.eq).toHaveBeenCalledWith('user_id', userId);
    expect(mockSupabaseQuery.order).toHaveBeenCalledWith('created_at', { ascending: false });
  });
});
