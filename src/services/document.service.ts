import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/config/supabase';
import type { AddDocumentBody, Document } from '@/models/document.model';

export async function getDocuments(userId: string) {
  const { data, error } = await supabase
    .from('documents')
    .select()
    .eq('user_id', userId as string)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data as Document[];
}

export async function getDocument(userId: string, applicationId: string) {
  const { data, error } = await supabase
    .from('documents')
    .select()
    .eq('id', applicationId)
    .eq('user_id', userId as string)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Document;
}

export async function addDocument(userId: string, body: AddDocumentBody) {
  const uniqueId = uuidv4();
  const { documentDescription, documentName, selectedApplication, file } = body;

  // upload file
  const { data: fileData, error: fileError } = await supabase.storage
    .from('documents')
    .upload(`file-${documentName}-${uniqueId}`, file);

  // Create record with path to file
  const { error } = await supabase.from('documents').insert({
    user_id: userId,
    title: documentName,
    description: documentDescription,
    file_path: fileData?.path,
    file_type: file.type,
    ...(selectedApplication && { application_id: selectedApplication }),
  });

  if (error) {
    throw new Error(error.message);
  }

  return fileData as {
    id: string;
    path: string;
    full_path: string;
  } | null;
}
