import { useNavigate } from "react-router-dom";
import { useData } from "../context/data/useData";
import ProjectCard from "../features/projects/ProjectCard";
import Loading from "../ui/Loading";

function Projects() {
  const { sectionData, isLoading } = useData();
  const projects = sectionData.projects;

  const navigate = useNavigate();

  if (isLoading) return <Loading />;

  return (
    <div className="grid grid-cols-2 gap-6">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onClick={() => navigate(`/projects/${project.id}`)}
        />
      ))}
    </div>
  );
}

export default Projects;
