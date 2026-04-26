import { FaTrashAlt } from "react-icons/fa";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";

function ExpEditorForm({ exp, setExp, onSave, currentCompany }) {
  const navigate = useNavigate();

  function handleAddPoint() {
    setExp({
      ...exp,
      description: [...exp.description, ""],
    });
  }

  function handleUpdatePoint(index, value) {
    const updatedDescription = [...exp.description];
    updatedDescription[index] = value;
    setExp({ ...exp, description: updatedDescription });
  }

  function handleDeletePoint(indexToDelete) {
    setExp((prev) => ({
      ...prev,
      description: prev.description.filter(
        (_, index) => index !== indexToDelete,
      ),
    }));
  }

  return (
    <form onSubmit={onSave} className="flex flex-col gap-2">
      <label>Role Name : </label>
      <input
        value={exp.role}
        className="bg-neutral-50 text-neutral-900 p-1 mb-3"
        onChange={(e) => setExp({ ...exp, role: e.target.value })}
      />
      <label>Company Name : </label>
      <input
        value={exp.company_name}
        className="bg-neutral-50 text-neutral-900 p-1 mb-3"
        onChange={(e) => setExp({ ...exp, company_name: e.target.value })}
      />
      <label>Location : </label>
      <input
        value={exp.location}
        className="bg-neutral-50 text-neutral-900 p-1 mb-3"
        onChange={(e) => setExp({ ...exp, location: e.target.value })}
      />
      <div className="flex gap-3 items-center">
        <label>Is Current Company ? :</label>
        <input
          type="checkbox"
          disabled={currentCompany}
          checked={exp.is_current}
          onChange={(e) => setExp({ ...exp, is_current: e.target.checked })}
          className="h-5 w-5"
        />
        {currentCompany && (
          <>
            <p className="text-red-400">{`You already have a current company "${currentCompany.company_name}".
    
    Please add an end date to that company before adding a new current company.`}</p>
            <Button
              type="button"
              variant="sky"
              onClick={() =>
                navigate(`/dashboard/content/experience/${currentCompany.id}`)
              }
            >
              {`Click to add end date to ${currentCompany.company_name}`}{" "}
            </Button>
          </>
        )}
      </div>

      <label>Start Date : </label>
      <input
        type="date"
        value={exp.start_date}
        className="bg-neutral-50 text-neutral-900 p-1 mb-3"
        onChange={(e) => setExp({ ...exp, start_date: e.target.value })}
      />
      {!exp.is_current && (
        <>
          <label>End Date : </label>
          <input
            type="date"
            value={exp.end_date}
            className="bg-neutral-50 text-neutral-900 p-1 mb-3"
            onChange={(e) => setExp({ ...exp, end_date: e.target.value })}
          />
        </>
      )}
      <label className="mt-8 mb-4">Experience :</label>

      {exp.description.map((point, index) => (
        <div className="flex gap-3" key={index}>
          <label>Point {index + 1} : </label>

          <textarea
            value={point}
            className="flex-1 bg-neutral-50 text-neutral-900 p-1 mb-5"
            onChange={(e) => handleUpdatePoint(index, e.target.value)}
          />
          <button
            type="button"
            className="cursor-pointer "
            onClick={() => handleDeletePoint(index)}
          >
            <FaTrashAlt />
          </button>
        </div>
      ))}
      <Button variant="sky" type="button" onClick={handleAddPoint}>
        Add point
      </Button>
      <Button variant="sky">Save</Button>
    </form>
  );
}

export default ExpEditorForm;
