import type { Database } from './supabase.model';

export type User = Database['public']['Tables']['users']['Row'] | null;
