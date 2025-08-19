import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import { createClient, SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Function to check if the user is an admin
async function isAdmin(supabaseClient: SupabaseClient): Promise<boolean> {
  const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
  if (userError || !user) {
    return false;
  }

  const { data: profile, error: profileError } = await supabaseClient
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profileError || !profile) {
    return false;
  }

  return profile.role === 'admin';
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Create a Supabase client with the user's auth token to check their role
    const userSupabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );

    // Check if the invoking user is an admin
    const isUserAdmin = await isAdmin(userSupabaseClient);
    if (!isUserAdmin) {
      return new Response(JSON.stringify({ error: 'Permission denied' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // If the user is an admin, create a service role client to fetch all users
    const serviceSupabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const { data: { users }, error: usersError } = await serviceSupabaseClient.auth.admin.listUsers();

    if (usersError) {
      throw usersError;
    }

    // Fetch all profiles to combine with user data
    const { data: profiles, error: profilesError } = await serviceSupabaseClient
      .from('profiles')
      .select('*');

    if (profilesError) {
      throw profilesError;
    }

    // Combine user and profile data into a single response
    const combinedData = users.map(user => {
      const profile = profiles.find(p => p.id === user.id);
      return {
        id: user.id,
        email: user.email,
        first_name: profile?.first_name || '',
        last_name: profile?.last_name || '',
        role: profile?.role || 'user',
      };
    });

    return new Response(JSON.stringify(combinedData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
})