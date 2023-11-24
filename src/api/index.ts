import {
  type SupabaseClientOptions,
  createClient,
} from '@supabase/supabase-js';
import type { Database } from '~/db/generated/database.types';
import { env } from '~/lib/env';

const options = {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
  global: {
    headers: { 'x-app-name': env.APP_NAME },
  },
} satisfies SupabaseClientOptions<string>;

export const api = createClient<Database>(
  env.SUPABASE_URL,
  env.SUPABASE_ANON_KEY,
  options,
);
