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
const setSupabaseUserId = async () => {
  const localUser = getLocalUser();
  if (localUser) {
    const { error } = await supabase.rpc('set_user_id', { user_id_input: localUser.id });
    if (error) {
      console.error('Error setting Supabase user_id for RLS:', error);
    } else {
      console.log('Supabase user_id set for RLS:', localUser.id);
    }
  } else {
    // Clear the user_id if no local user is present
    await supabase.rpc('set_user_id', { user_id_input: null });
    console.log('Supabase user_id cleared for RLS.');
  }
};

// Call this function on initial load and whenever the local user might change
setSupabaseUserId();

// You might want to re-call setSupabaseUserId when the local user changes (e.g., after setLocalUser or clearLocalUser)
// This would typically be handled by a global state or context, but for this local-storage based approach,
// we'll rely on page reloads or explicit calls after local storage changes.