import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL.replace(
  /\/rest\/v1\/?$/,
  "",
);
const supabaseKey = import.meta.env.VITE_SUPABASE_APIKEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
