import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.NEXT_PUBLIC_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL || 'https://mock.supabase.co';
const supabaseAnonKey = import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY || 'mock-key';

// Only create a real client if keys are provided, otherwise use a mock-like client 
// so the demo works locally even without a real database.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper to determine if we are in mock mode
export const isMockMode = supabaseUrl === 'https://mock.supabase.co';
