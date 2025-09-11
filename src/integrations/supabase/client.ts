import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL and Anon Key are missing from environment variables.');
  throw new Error('Supabase URL and Anon Key must be provided in environment variables.');
} else {
  console.log('Supabase URL loaded:', supabaseUrl ? 'Yes' : 'No');
  console.log('Supabase Anon Key loaded:', supabaseAnonKey ? 'Yes' : 'No');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);