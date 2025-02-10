import { supabase } from '@/config/supabase';
import type { CustomRequest } from '@/middlewares/auth.middleware';
import { Application } from '@/models/application.model';

export async function getApplications() {
  const { data, error } = await supabase
    .from('applications')
    .select()
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data as Application[];
}

export async function getApplication(req: CustomRequest) {
  const applicationId = req.params.applicationId;

  const { data, error } = await supabase
    .from('applications')
    .select()
    .eq('id', applicationId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Application;
}
