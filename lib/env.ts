import Constants from 'expo-constants';

/**
 * Environment variables utility
 * Safely access environment variables with fallbacks
 */

interface Env {
  NEXT_PUBLIC_SUPABASE_URL: string;
  NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
}

// Get environment variables from Expo Constants
const expoConstants = Constants.expoConfig?.extra;

// Create environment object with fallbacks to process.env
export const env: Env = {
  NEXT_PUBLIC_SUPABASE_URL: 
    expoConstants?.NEXT_PUBLIC_SUPABASE_URL || 
    process.env.NEXT_PUBLIC_SUPABASE_URL || 
    'https://koelbgdybdlayliaymge.supabase.co',
  
  NEXT_PUBLIC_SUPABASE_ANON_KEY: 
    expoConstants?.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtvZWxiZ2R5YmRsYXlsaWF5bWdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ1MDE3OTEsImV4cCI6MjA2MDA3Nzc5MX0.SbQMCriLhuNvKJ_FRIfB2jIw4cGIWxZVK6MXDaS6vPs',
};
