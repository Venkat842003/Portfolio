import { useNavigate } from "react-router-dom";
import { useData } from "../../context/data/useData";
import Button from "../../ui/Button";
import { formatDate } from "../../utils/formatDate";
import { useState } from "react";
import ExpEditorForm from "./ExpEditorForm";
import { supabase } from "../../lib/supabase";

function Experience() {
  const { sectionData, setSectionData } = useData();
  const experience = sectionData.experience;
  const [formOpen, setFormOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  //const [isCurrentCompany, setIsCurrentCompany] = useState(false);
  const [newExp, setNewExp] = useState({
    role: "",
    company_name: "",
    location: "",
    start_date: "",
    end_date: "",
    is_current: false,
    description: [""],
  });

  const currentCompany = experience.find((exp) => exp.is_current === true);

  const navigate = useNavigate();

  async function handleAddNewExp(e) {
    e.preventDefault();
    const { data: insertedExp, error } = await supabase
      .from("experience")
      .insert([newExp])
      .select()
      .single();

    if (error) {
      console.error(error.message);
    } else {
      setSectionData((prev) => ({
        ...prev,
        experience: [...prev.experience, insertedExp],
      }));
      alert("udapted succesfuly");
    }
  }

  async function handleDeleteExp(id) {
    const confirm = window.confirm(
      "Are you sure you want to delete this experience Category?",
    );
    if (!confirm) return;

    setDeletingId(id);
    const { error } = await supabase.from("experience").delete().eq("id", id);
    if (error) {
      console.error(error.message);
    } else {
      setSectionData((prev) => ({
        ...prev,
        experience: prev.experience.filter((exp) => exp.id !== id),
      }));
      setDeletingId(null);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {experience.map((exp) => (
        <div
          key={exp.id}
          className="mb-10 border border-neutral-600 rounded-xl p-5 flex flex-col gap-3"
        >
          <div className="flex justify-between flex-wrap mb-1">
            <h3 className="text-xl font-semibold">{exp.role}</h3>
            <span className="text-sm">
              {formatDate(exp.start_date)} -{" "}
              {exp.is_current ? "Present" : formatDate(exp.end_date)}
            </span>
          </div>
          <div className="flex justify-between flex-wrap mb-3">
            <p className=" font-medium">{exp.company_name}</p>
            <span className="text-sm ">{exp.location}</span>
          </div>
          <ul className="list-disc pl-5  space-y-2 mb-8">
            {exp.description.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
          <div className="flex gap-5 justify-center">
            <Button
              variant="sky"
              onClick={() =>
                navigate(`/dashboard/content/experience/${exp.id}`)
              }
            >
              {" "}
              Edit Experience
            </Button>
            <Button variant="red" onClick={() => handleDeleteExp(exp.id)}>
              Delete Experience
            </Button>
          </div>
        </div>
      ))}
      <div className="m-auto">
        <Button variant="sky" type="button" onClick={() => setFormOpen(true)}>
          Add Experience
        </Button>
      </div>
      {formOpen && (
        <ExpEditorForm
          exp={newExp}
          setExp={setNewExp}
          onSave={handleAddNewExp}
          currentCompany={currentCompany}
        />
      )}
    </div>
  );
}

export default Experience;

/* ------------------------------------------------
Visitors Today | Total Visitors | Messages | Downloads
------------------------------------------------

Visitor Trend Chart (7 / 30 days)

------------------------------------------------
Top Pages Viewed

Recent Messages
------------------------------------------------

Recent Activity
------------------------------------------------ */
