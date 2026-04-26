import { supabase } from "../../lib/supabase";

export async function getAbout() {
  const { data, error } = await supabase.from("about").select("*");

  if (error) {
    console.error(error.message);
    return [];
  }
  return data;
}
