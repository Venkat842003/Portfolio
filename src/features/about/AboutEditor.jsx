import { useState } from "react";
import { useData } from "../../context/data/useData";
import Button from "../../ui/Button";
import { supabase } from "../../lib/supabase";
import Loading from "../../ui/Loading";

function AboutEditor() {
  const { sectionData, setSectionData } = useData();

  const about = sectionData.about;

  const [isOpen, setIsOpen] = useState(false);  
  const [editingSet, setEditingSet] = useState(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(false);

  function handleEdit(set) {
    setEditingSet(set);
    setTitle(set.title);
    setContent(set.content);
    setIsOpen(true);
  }
  function handleAdd() {
    setEditingSet(null);
    setIsOpen(true);
  }

  async function handleUpdate(e) {
    e.preventDefault();
    const { error } = await supabase
      .from("about")
      .update({ title: title, content: content })
      .eq("id", editingSet.id)
      .select();

    if (error) {
      console.log(error.message);
    } else {
      setIsOpen(false);
      setSectionData((prev) => ({
        ...prev,
        about: prev.about.map((item) =>
          item.id === editingSet.id ? { ...item, title, content } : item,
        ),
      }));
      alert("Updated Successfully");
      setContent("");
      setTitle("");
    }
  }

  async function handleInsert(e) {
    e.preventDefault();
    const { data, error } = await supabase
      .from("about")
      .insert([{ title: title, content: content }])
      .select();
    if (error) {
      console.log(error);
    } else {
      const newItem = data[0];
      setIsOpen(false);
      alert("Section successfully added");
      setContent("");
      setTitle("");
      setSectionData((prev) => ({ ...prev, about: [...prev.about, newItem] }));
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this section?")) {
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("about").delete().eq("id", id);

    if (error) {
      console.log(error);
    } else {
      setSectionData((prev) => ({
        ...prev,
        about: prev.about.filter((item) => item.id !== id),
      }));
      setLoading(false);
      alert("Section deleted successfully");
    }
  }

  return (
    <div className="flex flex-col gap-3 ">
      {loading && <Loading />}
      {about.map((set) => (
        <div className="border border-neutral-600 rounded-xl p-6" key={set.id}>
          <h1 className="text-2xl font-bold mb-4">{set.title}</h1>
          <div className="space-y-4 text-neutral-300 leading-relaxed">
            {set.content.split("\n\n").map((para, index) => (
              <p key={index}>{para}</p>
            ))}
          </div>
          <div className="flex justify-center gap-5">
            <Button variant="sky" onClick={() => handleEdit(set)}>
              Edit
            </Button>
            <Button variant="red" onClick={() => handleDelete(set.id)}>
              Delete
            </Button>
          </div>
        </div>
      ))}

      <Button variant="sky" onClick={handleAdd}>
        Add New Section
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-neutral-900 p-6 rounded-xl w-full max-w-4xl">
            <h2 className="text-xl font-bold mb-4">
              {editingSet ? "Edit Section" : "Add Section"}
            </h2>

            <form
              onSubmit={editingSet ? handleUpdate : handleInsert}
              className="flex flex-col gap-3"
            >
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="p-2 rounded bg-neutral-800"
              />

              <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="p-2 rounded bg-neutral-800 h-70"
              />

              <div className="flex justify-end gap-2 mt-4">
                <Button variant="red" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button variant="sky">Save</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AboutEditor;
