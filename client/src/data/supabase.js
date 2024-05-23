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

const supabase = createClient('https://lfkywezetfugbjewdnbn.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxma3l3ZXpldGZ1Z2JqZXdkbmJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4Njg5MTksImV4cCI6MjAyMjQ0NDkxOX0.k5TH0WCrO3il5ZbSn9D7rIzFRVepSDs3bc9pZWVe7Y4', options);

export default supabase;
