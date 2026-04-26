import { useParams } from "react-router-dom";
import { useData } from "../../context/data/useData";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import ExpEditorForm from "./ExpEditorForm";

function ExpEditor() {
  const { sectionData, setSectionData } = useData();

  const { id } = useParams();

  const initialSelectedExp = {
    role: "",
    company_name: "",
    location: "",
    start_date: "",
    end_date: "",
    is_current: false,
    description: [""], // important: must be array
  };

  const [selectedExp, setSelectedExp] = useState(initialSelectedExp);

  useEffect(() => {
    const exp = sectionData.experience.find((exp) => exp.id === Number(id));
    if (exp) {
      setSelectedExp(exp);
    }
  }, [id, sectionData.experience]);

  async function handleSaveExp(e) {
    e.preventDefault();
    const { error } = await supabase
      .from("experience")
      .update(selectedExp)
      .eq("id", selectedExp.id);
    if (error) {
      console.error(error.message);
    } else {
      setSectionData((prev) => ({
        ...prev,
        experience: prev.experience.map((exp) =>
          exp.id === selectedExp.id ? selectedExp : exp,
        ),
      }));
      alert("udapted succesfuly");
    }
  }

  return (
    <ExpEditorForm
      exp={selectedExp}
      setExp={setSelectedExp}
      onSave={handleSaveExp}
    />
  );
}

export default ExpEditor;
