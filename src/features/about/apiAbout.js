import { supabase } from "../../lib/supabase";

export async function getAbout() {
  const { data, error } = await supabase.from("about").select("*").order(
    "display_order",
    { ascending: true },
  );

  if (error) {
    console.error(error.message);
    return [];
  }
  return data;
}
