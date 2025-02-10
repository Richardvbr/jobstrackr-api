import { supabase } from '@/config/supabase';
import type { CustomRequest } from '@/middlewares/auth.middleware';
import type { User } from '@/models/user.model';

export async function getUsers() {
  const { data, error } = await supabase.from('users').select('*');

  if (error) {
    throw new Error(error.message);
  }

  return data as User[];
}

export async function getUser(req: CustomRequest) {
  const id = req.user?.id ?? '';

  const { data, error } = await supabase.from('users').select('*').eq('id', id).single();

  if (error) {
    throw new Error(error.message);
  }

  return data as User;
}
