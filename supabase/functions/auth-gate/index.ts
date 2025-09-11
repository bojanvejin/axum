import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { hash, verify } from "https://deno.land/x/bcrypt@v0.4.2/mod.ts"; // Corrected bcrypt version
import { v4 as uuidv4 } from "https://deno.land/std@0.190.0/uuid/v4.ts";
import { create, getNumericDate } from "https://deno.land/x/djwt@v3.0.1/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/json',
};

// Helper to slugify names
function slugify(text: string) {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

// Generate a JWT secret for temporary tokens
const JWT_SECRET = Deno.env.get('JWT_SECRET') || 'super-secret-jwt-key-for-temp-tokens-change-me-in-prod';
const encoder = new TextEncoder();
const key = await crypto.subtle.importKey(
  "raw",
  encoder.encode(JWT_SECRET),
  { name: "HMAC", hash: "SHA-256" },
  false,
  ["sign", "verify"],
);

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, passphrase } = await req.json();

    if (!name || !passphrase) {
      return new Response(JSON.stringify({ error: 'Name and passphrase are required.' }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '', // Use service role key for direct DB access
    );

    // 1. Get active cohort
    const { data: activeCohorts, error: cohortError } = await supabaseClient
      .from('cohorts')
      .select('*')
      .eq('is_active', true);

    if (cohortError) throw cohortError;
    if (!activeCohorts || activeCohorts.length === 0) {
      return new Response(JSON.stringify({ error: 'No active cohort found.' }), {
        status: 500,
        headers: corsHeaders,
      });
    }
    const cohort = activeCohorts[0]; // Assuming one active cohort for simplicity

    // 2. Verify passphrase
    const isPassphraseCorrect = await verify(passphrase, cohort.team_passphrase_hash);
    if (!isPassphraseCorrect) {
      return new Response(JSON.stringify({ error: 'Invalid team passphrase.' }), {
        status: 401,
        headers: corsHeaders,
      });
    }

    // 3. Normalize name
    const nameSlug = slugify(name);

    // 4. Find or create user
    let userProfile;
    let mode: 'new' | 'returning' = 'returning';

    const { data: existingUser, error: findUserError } = await supabaseClient
      .from('profiles')
      .select('*')
      .eq('name_slug', nameSlug)
      .eq('cohort_id', cohort.id)
      .single();

    if (findUserError && findUserError.code !== 'PGRST116') { // PGRST116 means no rows found
      throw findUserError;
    }

    if (existingUser) {
      userProfile = existingUser;
    } else {
      // Ensure unique slug if there's a collision (e.g., "John Doe" and "John Doe 2")
      let uniqueNameSlug = nameSlug;
      let counter = 1;
      let slugExists = true;
      while (slugExists) {
        const { data: collisionCheck, error: collisionError } = await supabaseClient
          .from('profiles')
          .select('id')
          .eq('name_slug', uniqueNameSlug)
          .eq('cohort_id', cohort.id)
          .maybeSingle();

        if (collisionError) throw collisionError;

        if (collisionCheck) {
          uniqueNameSlug = `${nameSlug}-${counter}`;
          counter++;
        } else {
          slugExists = false;
        }
      }

      const newUserId = uuidv4.generate(); // Generate a UUID for the new user profile
      const { data: newUser, error: createUserError } = await supabaseClient
        .from('profiles')
        .insert({
          id: newUserId, // Use the generated UUID
          display_name: name,
          name_slug: uniqueNameSlug,
          cohort_id: cohort.id,
          role: 'student',
          auth_type: 'name_passphrase',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select('*')
        .single();

      if (createUserError) throw createUserError;
      userProfile = newUser;
      mode = 'new';
    }

    // 5. Issue temporary token (JWT)
    const tempToken = await create({ alg: "HS256", typ: "JWT" }, {
      sub: userProfile.id,
      aud: "authenticated",
      exp: getNumericDate(Date.now() + 5 * 60 * 1000), // 5 minutes expiry
      type: "temp_auth",
    }, key);

    return new Response(JSON.stringify({ status: 'ok', mode, temp_token: tempToken }), {
      headers: corsHeaders,
      status: 200,
    });

  } catch (error) {
    console.error('Auth Gate Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: corsHeaders,
    });
  }
});