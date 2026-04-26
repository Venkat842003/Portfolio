import { useParams } from "react-router-dom";
import { useData } from "../../context/data/useData";
import { supabase } from "../../lib/supabase";
import ProjectEditForm from "./ProjectEditForm";
import Loading from "../../ui/Loading";

function EditProjectPage() {
  const { id } = useParams();
  const { sectionData, setSectionData } = useData();

  const project = sectionData.projects.find(
    (project) => project.id === Number(id),
  );

  async function handleUpdate(data) {
    const { error } = await supabase
      .from("projects")
      .update(data)
      .eq("id", project.id);
    if (!error) {
      setSectionData((prev) => ({
        ...prev,
        projects: prev.projects.map((p) =>
          p.id === project.id ? { ...p, ...data } : p,
        ),
      }));
    }
  }
  if (!project) return <p>Loading...</p>;

  return <ProjectEditForm initialData={project} onSubmit={handleUpdate} />;
}

export default EditProjectPage;
