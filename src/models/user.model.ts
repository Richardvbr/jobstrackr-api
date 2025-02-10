import { Json } from './supabase.model';

export type User = {
  id: string;
  email: string | null;
  created_at: string;
  app_metadata: Json | null;
  user_metadata: Json | null;
} | null;
