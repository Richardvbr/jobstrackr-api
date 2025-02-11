import type { Database } from './supabase.model';

export type Document = Database['public']['Tables']['documents']['Row'];

export type AddDocumentBody = {
  documentName: string;
  documentDescription: string;
  selectedApplication: string;
  file: File;
};
