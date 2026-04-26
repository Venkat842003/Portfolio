import { useEffect, useState } from "react";
import Button from "../../ui/Button";
import { supabase } from "../../lib/supabase";

function ProjectEditForm({ initialData = null, onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    tagline: "",
    description: "",
    live_url: "",
    github_url: "",
    features: [""],
    tech_stack: [""],
    images: [],
  });

  const [uploading, setUploading] = useState(false);

  const [imagesToDelete, setImagesToDelete] = useState([]);

  const [imageFile, setImageFile] = useState(null);
  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        tech_stack: initialData.tech_stack?.length
          ? initialData.tech_stack
          : [""],
        features: initialData.features?.length ? initialData.features : [""],
        images: initialData.images?.length ? initialData.images : [],
      });
    }
  }, [initialData]);

  function getPathUrl(url) {
    const path = url.split("/storage/v1/object/public/images/")[1];

    return path[1] || null;
  }

  async function handleDeleteImage(index) {
    const imgUrl = form.images[index];
    setImagesToDelete((prev) => [...prev, imgUrl]);
    handleDeleteItem("images", index);
  }

  async function uploadImage() {
    if (!imageFile) return null;

    const fileName = `projects/${Date.now()}-${imageFile.name}`;

    const { error } = await supabase.storage
      .from("images")
      .upload(fileName, imageFile);

    if (error) {
      console.error(error);
      return null;
    }

    const { data } = supabase.storage.from("images").getPublicUrl(fileName);

    return data.publicUrl;
  }

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleAddItem(field) {
    setForm({
      ...form,
      [field]: [...form[field], ""],
    });
  }
  function handleUpdateItem(field, index, value) {
    const updated = [...form[field]];
    updated[index] = value;
    setForm({ ...form, [field]: updated });
  }

  function handleDeleteItem(field, index) {
    setForm({
      ...form,
      [field]: form[field].filter((_, i) => i !== index),
    });
  }
  async function handleSave(e) {
    e.preventDefault();

    setUploading(true);

    let updatedImages = [...form.images];
    if (imageFile) {
      const imageUrl = await uploadImage();
      if (imageUrl) updatedImages.push(imageUrl);
    }

    if (imagesToDelete.length > 0) {
      const paths = imagesToDelete
        .map((imgUrl) => getPathUrl(imgUrl))
        .filter(Boolean);

      await supabase.storage.from("images").remove(paths);
    }

    onSubmit({ ...form, images: updatedImages });
    setImageFile(null);
    setImagesToDelete([]);
    setUploading(false);
  }

  return (
    <form onSubmit={handleSave} className="flex flex-col gap-3">
      <label>Project Name : </label>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        className="bg-neutral-50 text-neutral-900 p-1 mb-3"
      />

      <label>Tagline : </label>
      <input
        name="tagline"
        value={form.tagline}
        onChange={handleChange}
        className="bg-neutral-50 text-neutral-900 p-1 mb-3"
      />

      <label>Project description : </label>
      <textarea
        name="description"
        value={form.description}
        rows={4}
        onChange={handleChange}
        className="bg-neutral-50 text-neutral-900 p-1 mb-3"
      />

      <label>Live URL : </label>
      <input
        name="live_url"
        value={form.live_url}
        onChange={handleChange}
        className="bg-neutral-50 text-neutral-900 p-1 mb-3"
      />

      <label>Github URL : </label>

      <input
        name="github_url"
        value={form.github_url}
        onChange={handleChange}
        className="bg-neutral-50 text-neutral-900 p-1 mb-3"
      />

      <label>Tech Stack : </label>
      {form.tech_stack.map((item, index) => (
        <div key={index}>
          <input
            value={item}
            onChange={(e) =>
              handleUpdateItem("tech_stack", index, e.target.value)
            }
            className="bg-neutral-50 text-neutral-900 p-1 mb-3"
          />

          <button
            type="button"
            onClick={() => handleDeleteItem("tech_stack", index)}
          >
            ❌
          </button>
        </div>
      ))}
      <Button
        variant="sky"
        type="button"
        onClick={() => handleAddItem("tech_stack")}
      >
        Add Tech
      </Button>

      <label> features : </label>
      {form.features.map((item, index) => (
        <div key={index}>
          <input
            value={item}
            onChange={(e) =>
              handleUpdateItem("features", index, e.target.value)
            }
            className="bg-neutral-50 text-neutral-900 p-1 mb-3"
          />

          <button
            type="button"
            onClick={() => handleDeleteItem("features", index)}
          >
            ❌
          </button>
        </div>
      ))}
      <Button
        variant="sky"
        type="button"
        onClick={() => handleAddItem("features")}
      >
        Add feature
      </Button>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files[0])}
        className="bg-sky-600 p-2"
      />
      {imageFile && (
        <img
          src={URL.createObjectURL(imageFile)}
          className="w-32 h-32 object-cover rounded-lg"
        />
      )}

      <div className="flex flex-wrap gap-4 mt-4">
        {form.images?.filter(Boolean).map((img, index) => (
          <div key={index} className="relative">
            <img
              src={img}
              alt="project"
              className="w-32 h-32 object-cover rounded-lg border"
            />
            <button
              type="button"
              onClick={() => handleDeleteImage(index)}
              className="absolute top-1 right-1 bg-black/70 text-white text-xs px-2 py-1 rounded"
            >
              ❌
            </button>
          </div>
        ))}
      </div>

      <Button variant="sky">{uploading ? "Saving..." : "Save"}</Button>
    </form>
  );
}

export default ProjectEditForm;
