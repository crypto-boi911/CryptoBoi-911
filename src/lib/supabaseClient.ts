import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hqcaduflnrucatgniwgd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxY2FkdWZsbnJ1Y2F0Z25pd2dkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5OTExODcsImV4cCI6MjA2NDU2NzE4N30.efLHYTpN2gTnNM7Pb6VkOf9qfFV5QVo0RxM-jXo8Row';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
