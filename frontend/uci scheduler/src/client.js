import {createClient} from '@supabase/supabase-js';

const URL = 'https://rnoxkhhmdlohjaiyxyhg.supabase.co'

const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJub3hraGhtZGxvaGphaXl4eWhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTEzNzU4MjIsImV4cCI6MjAwNjk1MTgyMn0.gFlrrwFzsu4syIqQTrT3mW2fphtB4ABUr1ives18f6k'

export const supabase = createClient(URL, API_KEY);
