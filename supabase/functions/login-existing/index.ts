import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { verify } from "https://deno.land/x/bcrypt@v0.4.0/mod.ts"; // Corrected bcrypt import
import { create, getNumericDate } from "https://deno.land/x/djwt@v3.0.1/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/json',
};

// Helper to slugify names (duplicate from auth-gate for self-contained function)
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

// Session JWT secret (must match set-personal-secret)
const SESSION_JWT_SECRET = Deno.env.get('SESSION_JWT_SECRET') || 'super-secret-session-jwt-key-change-me-in-prod';
const encoder = new TextEncoder();
const sessionKey = await crypto.subtle.importKey(
  "raw",
  encoder.encode(SESSION_JWT_SECRET),
  { name: "HMAC", hash: "SHA-256" },
  false,
  ["sign", "verify"],
);

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, secret } = await req.json(); // 'secret' can be PIN or password

    if (!name || !secret) {
      return new Response(JSON.stringify({ error: 'Name and personal secret are required.' }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    // Resolve cohort (for now, assume active cohort)
    const { data: activeCohorts, error: cohortError } = await supabaseClient
      .from('cohorts')
      .select('id')
      .eq('is_active', true);

    if (cohortError) throw cohortError;
    if (!activeCohorts || activeCohorts.length === 0) {
      return new Response(JSON.stringify({ error: 'No active cohort found.' }), {
        status: 500,
        headers: corsHeaders,
      });
    }
    const cohortId = activeCohorts[0].id;

    // Find user by slug and cohort
    const nameSlug = slugify(name);
    const { data: userProfile, error: findUserError } = await supabaseClient
      .from('profiles')
      .select('id, pin_hash, password_hash')
      .eq('name_slug', nameSlug)
      .eq('cohort_id', cohortId)
      .single();

    if (findUserError || !userProfile) {
      return new Response(JSON.stringify({ error: 'Invalid name or secret.' }), {
        status: 401,
        headers: corsHeaders,
      });
    }

    // Verify secret
    let isSecretCorrect = false;
    if (userProfile.pin_hash) {
      isSecretCorrect = await verify(secret, userProfile.pin_hash);
    } else if (userProfile.password_hash) {
      isSecretCorrect = await verify(secret, userProfile.password_hash);
    }

    if (!isSecretCorrect) {
      return new Response(JSON.stringify({ error: 'Invalid name or secret.' }), {
        status: 401,
        headers: corsHeaders,
      });
    }

    // Issue session JWT
    const sessionToken = await create({ alg: "HS256", typ: "JWT" }, {
      sub: userProfile.id,
      aud: "authenticated",
      exp: getNumericDate(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days expiry
      type: "session",
    }, sessionKey);

    // Set the session token as an HTTPOnly cookie
    const headers = {
      ...corsHeaders,
      'Set-Cookie': `sb-access-token=${sessionToken}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${7 * 24 * 60 * 60}`,
    };

    return new Response(JSON.stringify({ message: 'Login successful.' }), {
      headers,
      status: 200,
    });

  } catch (error) {
    console.error('Login Existing Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: corsHeaders,
    });
  }
});