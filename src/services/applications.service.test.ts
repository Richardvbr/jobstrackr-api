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
    (
      supabase
        .from('applications')
        .select()
        .eq('user_id', userId)
        .order('created_at', { ascending: true }) as unknown as jest.Mock
    ).mockResolvedValueOnce({
      data: mockApplications,
      error: null,
    });

    const applications = await getApplications(userId);

    expect(supabase.from).toHaveBeenCalledWith('applications');
    expect(supabase.from('applications').select).toHaveBeenCalled();
    expect(supabase.from('applications').select().eq).toHaveBeenCalledWith('user_id', userId);
    expect(supabase.from('applications').select().eq('user_id', userId).order).toHaveBeenCalledWith(
      'created_at',
      {
        ascending: true,
      }
    );
    expect(applications).toEqual(mockApplications);
  });

  it('should fetch a single application by ID', async () => {
    (
      supabase.from('applications').select().eq('user_id', userId).single as unknown as jest.Mock
    ).mockResolvedValueOnce({
      data: mockApplications[0],
      error: null,
    });

    const application = await getApplication(userId, applicationId);

    expect(supabase.from).toHaveBeenCalledWith('applications');
    expect(application).toEqual(mockApplications[0]);
  });

  it('should throw an error if fetching applications fails', async () => {
    (
      supabase.from('applications').select().eq('user_id', userId).order as jest.Mock
    ).mockResolvedValueOnce({
      data: null,
      error: { message: 'Database error' },
    });

    await expect(getApplications(userId)).rejects.toThrow('Database error');
  });
});
