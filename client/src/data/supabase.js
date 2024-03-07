import { createClient } from '@supabase/supabase-js';

const options = {
    db: {
        schema: 'public'
    },
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true   
    },
    global: {
        headers: {
            
        }

    }

}

const supabase = createClient(process.env.NEXT_PUBLIC_SUPBASE_PROJECT_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_PUBLIC_KEY, options)

export default supabase;
