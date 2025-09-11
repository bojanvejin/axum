import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL and Anon Key are missing from environment variables.');
  // We will not throw an error here, as the app might still function for curriculum display
  // without a fully configured Supabase client if auth is not needed.
  // However, features relying on Supabase data will fail.
  console.warn('Supabase client might not be fully functional due to missing environment variables.');
} else {
  console.log('Supabase URL loaded:', supabaseUrl ? 'Yes' : 'No');
  console.log('Supabase Anon Key loaded:', supabaseAnonKey ? 'Yes' : 'No');
}

// Initialize Supabase client without auth-specific configurations
export const supabase = createClient(supabaseUrl || 'YOUR_SUPABASE_URL', supabaseAnonKey || 'YOUR_SUPABASE_ANON_KEY');