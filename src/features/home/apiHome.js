import { supabase } from "../../lib/supabase";

export async function getHero() {
  const { data, error } = await supabase.from("hero").select("*").single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
}


