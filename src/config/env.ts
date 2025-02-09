import { config } from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV ?? 'development'}.local` });

export const {
  PORT,
  NODE_ENV,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  SUPABASE_URL,
  SUPABASE_SERVICE_KEY,
  SUPABASE_ANON_KEY,
  OTP_EMAIL_REDIRECT,
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
  EMAILJS_PK,
  CORS_WHITELIST,
} = process.env as Record<string, string>;
