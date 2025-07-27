import { createClient } from '@supabase/supabase-js'
// import { Database } from '../types/supabase' // Optional: if you generate Supabase types

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

// If you have Supabase types generated, use `Database` generic
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// If you don’t have types generated yet, you can omit <Database>:
//
// export const supabase = createClient(supabaseUrl, supabaseAnonKey);
