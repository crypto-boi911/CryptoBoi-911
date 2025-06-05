import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nhlqmqoppyrqxkbrekbi.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5obHFtcW9wcXlycXhrYnJla2JpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxNDg5MzgsImV4cCI6MjA2NDcyNDkzOH0.d2lH5-fb-bAnWANZ8KWqB_0_9uzqZonApHV3LbP1EpA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
