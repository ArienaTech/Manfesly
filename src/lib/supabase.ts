import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ CRITICAL: Missing Supabase environment variables!');
  console.error('VITE_SUPABASE_URL:', supabaseUrl ? 'SET' : 'MISSING');
  console.error('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'SET' : 'MISSING');
  console.error('This will cause the app to fail. Check your .env file.');
}

console.log('🔧 Supabase client initializing...');
console.log('URL:', supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : 'EMPTY');
console.log('Key:', supabaseAnonKey ? 'SET (length: ' + supabaseAnonKey.length + ')' : 'EMPTY');

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
