import { supabase } from '../lib/supabase';

/**
 * Authentication service for handling Supabase auth operations
 */

/**
 * Sign in with phone number (sends OTP)
 * @param phone Phone number in international format (e.g., +628123456789)
 */
export async function signInWithPhone(phone: string) {
  const { data, error } = await supabase.auth.signInWithOtp({
    phone,
  });
  
  if (error) {
    throw error;
  }
  
  return data;
}

/**
 * Verify OTP code sent to phone
 * @param phone Phone number used for sign in
 * @param token OTP code received via SMS
 */
export async function verifyOtp(phone: string, token: string) {
  const { data, error } = await supabase.auth.verifyOtp({
    phone,
    token,
    type: 'sms',
  });
  
  if (error) {
    throw error;
  }
  
  return data;
}

/**
 * Sign out the current user
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    throw error;
  }
  
  return true;
}

/**
 * Get the current session
 */
export async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  
  if (error) {
    throw error;
  }
  
  return data;
}

/**
 * Get the current user
 */
export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error) {
    throw error;
  }
  
  return user;
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated() {
  const { session } = await getSession();
  return !!session;
}
