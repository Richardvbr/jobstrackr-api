import type { Database } from './supabase.model';

export type Document = Database['public']['Tables']['documents']['Row'];
