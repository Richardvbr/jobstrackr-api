import { supabase } from '@/config/supabase';
import type { CustomRequest } from '@/middlewares/auth.middleware';
import { Application } from '@/models/application.model';

export async function getApplications(id: string) {
  const { data, error } = await supabase
    .from('applications')
    .select()
    .eq('user_id', id as string)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data as Application[];
}

export async function getApplication(id: string, applicationId: string) {
  const { data, error } = await supabase
    .from('applications')
    .select()
    .eq('id', applicationId)
    .eq('user_id', id as string)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Application;
}
