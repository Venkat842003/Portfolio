import { supabase } from "../../lib/supabase";

export async function getProject() {
  const { data, error } = await supabase.from("projects").select("*");

  if (error) {
    console.error(error.message);
    return [];
  }
  return data;
}
