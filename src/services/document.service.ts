import { supabase } from '@/config/supabase';
import type { Document } from '@/models/document.model';

export async function getDocuments(id: string) {
  const { data, error } = await supabase
    .from('documents')
    .select()
    .eq('user_id', id as string)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data as Document[];
}

export async function getDocument(id: string, applicationId: string) {
  const { data, error } = await supabase
    .from('documents')
    .select()
    .eq('id', applicationId)
    .eq('user_id', id as string)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Document;
}
