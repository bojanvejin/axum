import { createClient } from '@supabase/supabase-js';
import { getLocalUser } from '@/utils/localUser'; // Import getLocalUser

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

// Function to set the user_id in the Supabase session context for RLS
const setSupabaseUserId = async (userId: string | null) => {
  // Treat empty string as null for UUID conversion
  const idToSet = (userId === "" || userId === undefined) ? null : userId;

  if (idToSet) {
    const { error } = await supabase.rpc('set_user_id', { user_id_input: idToSet });
    if (error) {
      console.error('Error setting Supabase user_id for RLS:', error);
    } else {
      console.log('Supabase user_id set for RLS:', idToSet);
    }
  } else {
    // Clear the user_id if no local user is present or ID is empty
    const { error } = await supabase.rpc('set_user_id', { user_id_input: null });
    if (error) {
      console.error('Error clearing Supabase user_id for RLS:', error);
    } else {
      console.log('Supabase user_id cleared for RLS.');
    }
  }
};

// Export the function so it can be called from components
export { setSupabaseUserId };