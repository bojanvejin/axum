import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { hash } from "https://esm.sh/bcryptjs@2.4.3"; // Changed to bcryptjs from esm.sh
import { verify as verifyJwt, create, getNumericDate } from "https://deno.land/x/djwt@v3.0.1/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/json',
};

// JWT secret for temporary tokens (must match auth-gate)
const JWT_SECRET = Deno.env.get('JWT_SECRET') || 'super-secret-jwt-key-for-temp-tokens-change-me-in-prod';
const encoder = new TextEncoder();
const key = await crypto.subtle.importKey(
  "raw",
  encoder.encode(JWT_SECRET),
  { name: "HMAC", hash: "SHA-256" },
  false,
  ["sign", "verify"],
);

// Session JWT secret (new secret for long-lived sessions)
const SESSION_JWT_SECRET = Deno.env.get('SESSION_JWT_SECRET') || 'super-secret-session-jwt-key-change-me-in-prod';
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
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized: Missing or invalid temporary token.' }), {
        status: 401,
        headers: corsHeaders,
      });
    }
    const tempToken = authHeader.replace('Bearer ', '');

    let payload;
    try {
      payload = await verifyJwt(tempToken, key);
      if (payload.type !== 'temp_auth') {
        throw new Error('Invalid token type.');
      }
    } catch (jwtError) {
      console.error('JWT Verification Error:', jwtError);
      return new Response(JSON.stringify({ error: 'Unauthorized: Invalid or expired temporary token.' }), {
        status: 401,
        headers: corsHeaders,
      });
    }

    const userId = payload.sub;
    if (!userId) {
      return new Response(JSON.stringify({ error: 'Invalid temporary token payload.' }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    const { pin, password } = await req.json();

    if (!pin && !password) {
      return new Response(JSON.stringify({ error: 'PIN or password is required.' }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    let updateData: { pin_hash?: string; password_hash?: string } = {};
    if (pin) {
      updateData.pin_hash = await hash(pin);
    } else if (password) {
      updateData.password_hash = await hash(password);
    }

    const { error: updateError } = await supabaseClient
      .from('profiles')
      .update(updateData)
      .eq('id', userId);

    if (updateError) throw updateError;

    // Create a long-lived session JWT
    const sessionToken = await create({ alg: "HS256", typ: "JWT" }, {
      sub: userId,
      aud: "authenticated",
      exp: getNumericDate(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days expiry
      type: "session",
    }, sessionKey);

    // Set the session token as an HTTPOnly cookie
    const headers = {
      ...corsHeaders,
      'Set-Cookie': `sb-access-token=${sessionToken}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${7 * 24 * 60 * 60}`,
    };

    return new Response(JSON.stringify({ message: 'Personal secret set successfully.' }), {
      headers,
      status: 200,
    });

  } catch (error) {
    console.error('Set Personal Secret Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: corsHeaders,
    });
  }
});