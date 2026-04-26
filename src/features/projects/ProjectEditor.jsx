import { useNavigate } from "react-router-dom";
import { useData } from "../../context/data/useData";
import ProjectCard from "./ProjectCard";
import Button from "../../ui/Button";
import { supabase } from "../../lib/supabase";
import { useState } from "react";
import Loading from "../../ui/Loading";

function ProjectEditor() {
  const { sectionData, setSectionData } = useData();
  const projects = sectionData.projects;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?",
    );
    if (!confirmDelete) return;
    setLoading(true);
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (!error) {
      setSectionData((prev) => ({
        ...prev,
        projects: prev.projects.filter((p) => p.id !== id),
      }));
      setLoading(false);
    }
  }

  function handleEdit(project) {
    navigate(`/dashboard/content/projects/${project.id}`);
  }

  if (loading) return <Loading />;

  return (
    <div>
      <div className="grid grid-cols-2 gap-6 mb-5">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            showEdit={true}
            onEdit={() => handleEdit(project)}
            onDelete={() => handleDelete(project.id)}
          />
        ))}
      </div>

      <Button onClick={() => navigate("/dashboard/content/projects/new")}>
        Add Project
      </Button>
    </div>
  );
}

export default ProjectEditor;
