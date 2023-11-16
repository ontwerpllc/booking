import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  SUPABASE_URL: z
    .string()
    .url()
    .refine((value) => !value.includes('YOUR_SUPABASE_URL_HERE')),
  SUPABASE_ANON_KEY: z
    .string()
    .refine((value) => !value.includes('YOUR_SUPABASE_ANON_KEY_HERE')),
  APP_TITLE: z.string(),
  BRAND_NAME: z.string(),
  APP_VERSION: z.string(),
});

const envFromMeta = {
  NODE_ENV: import.meta.env.NODE_ENV,
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
  APP_TITLE: import.meta.env.VITE_APP_TITLE,
  BRAND_NAME: import.meta.env.VITE_BRAND_NAME,
  APP_VERSION: import.meta.env.VITE_APP_VERSION,
} satisfies z.infer<typeof envSchema>;

function getEnv() {
  try {
    return envSchema.parse(envFromMeta);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("⚠️ Couldn't load environment variables");
    throw error;
  }
}

export const env = getEnv();
