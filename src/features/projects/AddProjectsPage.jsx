import { useData } from "../../context/data/useData";
import { supabase } from "../../lib/supabase";
import ProjectEditForm from "./ProjectEditForm";
import Loading from "../../ui/Loading";

function AddProjectsPage() {
  const { setSectionData } = useData();

  async function handleAdd(data) {
    const { data: inserted, error } = await supabase
      .from("projects")
      .insert([data])
      .select()
      .single();

    if (error) {
      console.error(error.message);
    } else {
      setSectionData((prev) => ({
        ...prev,
        projects: [...prev.projects, inserted],
      }));
    }
  }

  return <ProjectEditForm onSubmit={handleAdd} />;
}

export default AddProjectsPage;
