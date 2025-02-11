import { supabase } from '@/config/supabase';
import type { Application } from '@/models/application.model';

export async function getApplications(userId: string) {
  const { data, error } = await supabase
    .from('applications')
    .select()
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data as Application[];
}

export async function getApplication(userId: string, applicationId: string) {
  const { data, error } = await supabase
    .from('applications')
    .select()
    .eq('id', applicationId)
    .eq('user_id', userId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Application;
}

export async function updateApplication(
  userId: string,
  applicationId: string,
  application: Application
) {
  const { error, data } = await supabase
    .from('applications')
    .update(application)
    .eq('id', applicationId)
    .eq('user_id', userId)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function newApplication(userId: string, application: Application) {
  const { error, data } = await supabase
    .from('applications')
    .insert({ ...application, user_id: userId })
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteApplication(userId: string, applicationId: string) {
  const { error, data } = await supabase
    .from('applications')
    .delete()
    .eq('id', applicationId)
    .eq('user_id', userId)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
