import type { Database } from './supabase.model';

export type Application = Database['public']['Tables']['applications']['Row'];
