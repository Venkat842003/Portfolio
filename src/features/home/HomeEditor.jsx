import { useState } from "react";
import Button from "../../ui/Button";
import { supabase } from "../../lib/supabase";
import { useData } from "../../context/data/useData";
import Loading from "../../ui/Loading";

function HomeEditor() {
  const { sectionData, setSectionData } = useData();
  const [loading, setLoading] = useState(false);

  const hero = sectionData.home;

  const initialState = {
    name: "",
    title: "",
    description: "",
  };

  const [formData, setFormData] = useState(initialState);

  function handleAutofill() {
    setFormData({
      name: hero?.name ?? "",
      title: hero?.title ?? "",
      description: hero?.description ?? "",
    });
  }

  const isUnchanged =
    formData.name === hero?.name &&
    formData.title === hero?.title &&
    formData.description === hero?.description;

  async function handleSave(e) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase
      .from("hero")
      .update(formData)
      .eq("id", hero.id)
      .select()
      .single();

    if (error) {
      console.error(error.message);
    } else {
      console.log("Saved successfuly");
      setLoading(false);
      setSectionData((prev) => ({
        ...prev,
        home: { ...prev.home, ...formData },
      }));
    }
  }

  return (
    <div>
      <form onSubmit={handleSave} className="flex flex-col gap-3 items-start">
        <label htmlFor="name">Name:</label>
        <input
          value={formData.name}
          type="text"
          className=" bg-neutral-100 text-neutral-950 p-2 w-2/5"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />

        <label htmlFor="title">Title:</label>
        <input
          value={formData.title}
          type="text"
          className=" bg-neutral-100 text-neutral-950 p-2 w-2/5"
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />

        <label htmlFor="description">Description:</label>
        <textarea
          value={formData.description}
          type="text"
          rows={3}
          className=" bg-neutral-100 text-neutral-950 p-2 w-4/5"
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        <div className=" flex m-auto py-6 gap-4">
          <Button
            variant="red"
            type="button"
            onClick={() => setFormData(initialState)}
          >
            Clear all
          </Button>
          <Button
            disabled={isUnchanged}
            title={
              isUnchanged
                ? "No changes detected. Please make changes to save."
                : "Save changes"
            }
            variant="sky"
          >
            {loading ? <Loading /> : "Save"}
          </Button>
          <Button variant="form" type="button" onClick={handleAutofill}>
            Autofill form with existing data
          </Button>
        </div>
      </form>
    </div>
  );
}

export default HomeEditor;

/*  I’m a Technical Support Engineer with over 2 years of experience supporting SaaS and HaaS products, specializing in troubleshooting complex software, hardware, and network-related issues in production environments. 
Alongside my support experience, I’ve been actively building my skills in frontend development using React, JavaScript, and modern web technologies. I enjoy creating responsive user interfaces, integrating APIs, and developing scalable applications with clean and maintainable code. 
 */
