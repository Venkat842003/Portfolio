import { useEffect, useState } from "react";
import Button from "../../ui/Button";
import { useData } from "../../context/data/useData";
import { supabase } from "../../lib/supabase";
import { useParams } from "react-router-dom";

import { FaTrashAlt } from "react-icons/fa";

function SkillEditor() {
  const { sectionData, setSectionData } = useData();
  const [selectedSkill, setSelectedSkill] = useState({
    skill_category: "",
    skills: [],
  });

  const { id } = useParams();

  useEffect(() => {
    const skill = sectionData.skills.find((skill) => skill.id === Number(id));

    if (skill) {
      setSelectedSkill({ ...skill });
    }
  }, [id, sectionData.skills]);

  function handleAddSkill() {
    setSelectedSkill({
      ...selectedSkill,
      skills: [...selectedSkill.skills, ""],
    });
  }

  function handleUpdateSkill(index, value) {
    const updatedSkills = [...selectedSkill.skills];
    updatedSkills[index] = value;

    setSelectedSkill({ ...selectedSkill, skills: updatedSkills });
    console.log(selectedSkill);
  }

  function handleDeleteSkill(indexToDelete) {
    setSelectedSkill((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, index) => index !== indexToDelete),
    }));
  }

  async function handleSave(e) {
    e.preventDefault();

    const { error } = await supabase
      .from("skills")
      .update(selectedSkill)
      .eq("id", selectedSkill.id)
      .select("*");

    if (error) {
      console.error(error.message);
    } else {
      setSectionData((prev) => ({
        ...prev,
        skills: prev.skills.map((skill) =>
          skill.id === selectedSkill.id ? selectedSkill : skill,
        ),
      }));
    }
  }

  return (
    <form onSubmit={handleSave} className=" flex flex-col gap-4">
      <label>Skill Category: </label>
      <input
        value={selectedSkill.skill_category}
        onChange={(e) =>
          setSelectedSkill({
            ...selectedSkill,
            skill_category: e.target.value,
          })
        }
        className="bg-neutral-50 text-neutral-900 p-1"
      />
      {selectedSkill.skills.map((skill, index) => (
        <div key={index} className="flex gap-3">
          <label>Skill {index + 1}: </label>
          <input
            value={skill}
            onChange={(e) => handleUpdateSkill(index, e.target.value)}
            className="bg-neutral-50 text-neutral-900 p-1"
          />
          <button
            onClick={() => handleDeleteSkill(index)}
            className="cursor-pointer"
          >
            <FaTrashAlt />
          </button>
        </div>
      ))}
      <div>
        <Button variant="sky" type="button" onClick={handleAddSkill}>
          Add Skill
        </Button>
        <Button variant="sky">Save</Button>
      </div>
    </form>
  );
}

export default SkillEditor;

/* 
  <form className="flex flex-col gap-6">
          <div>
            <label>Skill category : </label>

            <input className="bg-neutral-50 p-1" />
          </div>
          {skills.map((skill, index) => (
            <div>
              <label>Skill {index + 1}: </label>
              <input className="bg-neutral-50 p-1" />
            </div>
          ))}
          <Button variant="sky" onClick={handleAddSkill}>
            Add skill
          </Button>
        </form> */
