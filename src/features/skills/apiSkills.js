import { supabase } from "../../lib/supabase";

export async function getSkills() {
  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    console.error(error.message);
    return [];
  }
  return data;
}
  