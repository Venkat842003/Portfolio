import { supabase } from "../../lib/supabase";

export async function getExperience() {
  const { data, error } = await supabase
    .from("experience")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error(error.message);
    return [];
  }

  return data;
}
