import { getApplications, getApplication } from '@/services/application.service';
import { supabase } from '@/config/supabase';
import { mockApplications } from '../../__mocks__/data/application';

describe('Application Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const userId = 'user123';
  const applicationId = '1675cad0-41d4-429a-97a9-c7964ea4692e';

  it('should fetch all applications for a user', async () => {
    const mockSupabaseQuery = {
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      order: jest.fn().mockResolvedValueOnce({
        data: mockApplications,
        error: null,
      }),
    };

    jest.spyOn(supabase, 'from').mockReturnValue(mockSupabaseQuery);

    const applications = await getApplications(userId);

    expect(supabase.from).toHaveBeenCalledWith('applications');
    expect(mockSupabaseQuery.select).toHaveBeenCalled();
    expect(mockSupabaseQuery.eq).toHaveBeenCalledWith('user_id', userId);
    expect(mockSupabaseQuery.order).toHaveBeenCalledWith('created_at', { ascending: false });
    expect(applications).toEqual(mockApplications);
  });

  it('should fetch a single application by ID', async () => {
    const mockSupabaseQuery = {
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValueOnce({
        data: mockApplications[0],
        error: null,
      }),
    };

    jest.spyOn(supabase, 'from').mockReturnValue(mockSupabaseQuery);

    const application = await getApplication(userId, applicationId);

    expect(supabase.from).toHaveBeenCalledWith('applications');
    expect(mockSupabaseQuery.select).toHaveBeenCalled();
    expect(mockSupabaseQuery.eq).toHaveBeenCalledWith('id', applicationId);
    expect(mockSupabaseQuery.eq).toHaveBeenCalledWith('user_id', userId);
    expect(application).toEqual(mockApplications[0]);
  });

  it('should throw an error if fetching applications fails', async () => {
    const mockSupabaseQuery = {
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      order: jest.fn().mockResolvedValueOnce({
        data: null,
        error: { message: 'Database error' },
      }),
    };

    jest.spyOn(supabase, 'from').mockReturnValue(mockSupabaseQuery);

    await expect(getApplications(userId)).rejects.toThrow('Database error');

    expect(supabase.from).toHaveBeenCalledWith('applications');
    expect(mockSupabaseQuery.select).toHaveBeenCalled();
    expect(mockSupabaseQuery.eq).toHaveBeenCalledWith('user_id', userId);
    expect(mockSupabaseQuery.order).toHaveBeenCalledWith('created_at', { ascending: false });
  });
});
