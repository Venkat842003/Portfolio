import Button from "../../ui/Button";

function ProjectCard({ onClick, project, onEdit, showEdit, onDelete }) {
  return (
    <div
      className="border border-neutral-800 rounded-2xl p-4  flex flex-col gap-2 cursor-pointer hover:border-neutral-500 bg-purple-800 hover:bg-fuchsia-800 transition"
      onClick={onClick}
    >
      <p className="font-bold text-xl mb-2">{project.name}</p>

      <p>{project.tagline}</p>
      {showEdit && (
        <div>
          <div className="flex gap-2">
            <Button variant="sky" onClick={onEdit}>
              Edit
            </Button>
            <Button variant="red" onClick={onDelete}>
              delete
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectCard;
