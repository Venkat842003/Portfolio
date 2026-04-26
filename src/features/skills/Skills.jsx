import { useNavigate } from "react-router-dom";
import { useData } from "../../context/data/useData";
import Button from "../../ui/Button";
import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

import Loading from "../../ui/Loading";

function Skills() {
  const { sectionData, setSectionData } = useData();
  const skills = sectionData.skills;
  const [open, setOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  function handleAddNewSkillCategory(e) {
    e.preventDefault();
    setOpen(true);
  }

  async function handleSaveCategory() {
    setSaving(true);
    const { data, error } = await supabase
      .from("skills")
      .insert([
        {
          skill_category: newCategory,
          skills: [],
          display_order: sectionData.skills.length + 1,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error(error.message);
    } else {
      setSectionData((prev) => ({ ...prev, skills: [...prev.skills, data] }));
      setNewCategory("");
      setSaving(false);
      setOpen(false);
    }
  }

  async function handleDeleteCategory(id) {
    if (window.confirm("Are you sure you want to delete this Skill Category?"))
      setDeletingId(id);
    const { error } = await supabase.from("skills").delete().eq("id", id);
    if (error) {
      console.error(error.message);
    } else {
      setSectionData((prev) => ({
        ...prev,
        skills: prev.skills.filter((skill) => skill.id !== id),
      }));
      setDeletingId(null);
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {skills.map((skill) => (
        <div
          key={skill.id}
          className="flex flex-col gap-3 border border-neutral-600 p-6 rounded-2xl hover:border-neutral-400 transition"
        >
          <div>
            <h1 className="text-2xl font-bold mb-3 pb-2">
              {skill.skill_category}
            </h1>
            <ul className="list-disc pl-5  space-y-2">
              {skill.skills.map((skills, index) => (
                <li key={index}>{skills}</li>
              ))}
            </ul>
          </div>
          <div className="flex gap-8 pt-5 mt-auto">
            <Button
              variant="sky"
              onClick={() => navigate(`/dashboard/content/skills/${skill.id}`)}
            >
              Edit <FaEdit />
            </Button>
            <button
              className="cursor-pointer"
              onClick={() => handleDeleteCategory(skill.id)}
            >
              {deletingId === skill.id ? <Loading /> : <FaTrashAlt />}
            </button>
          </div>
        </div>
      ))}
      <div className="border border-neutral-600 p-6 rounded-2xl hover:border-neutral-400 transition items-center">
        <Button variant="sky" onClick={handleAddNewSkillCategory}>
          Add SKill Category
        </Button>
        {open && (
          <div className="flex flex-col gap-3">
            <label className="pt-4"> Category Name: </label>
            <input
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter Category Name"
              className="bg-neutral-50 text-neutral-900 p-1 rounded"
            />
            <div className=" flex m-auto gap-5">
              <Button variant="red" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="sky" onClick={handleSaveCategory}>
                {saving ? <Loading /> : "Save"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Skills;
