import { createClient } from '@supabase/supabase-js';
import type { Database } from '../models/supabase.model';
import { SUPABASE_SERVICE_KEY, SUPABASE_URL } from './env';

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_SERVICE_KEY);
