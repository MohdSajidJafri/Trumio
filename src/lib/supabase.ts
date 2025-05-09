import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

// Test the connection
// const testConnection = async () => {
//   try {
//     const { data, error } = await supabase.from('users').select('count').limit(1);
//     if (error) throw error;
//     // console.log('Successfully connected to Supabase');
//   } catch (error) {
//     console.error('Error connecting to Supabase:', error);
//   }
// };
//
// testConnection();

export default supabase; 