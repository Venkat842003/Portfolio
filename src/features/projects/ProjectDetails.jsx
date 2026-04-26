import { useNavigate, useParams } from "react-router-dom";
import { useData } from "../../context/data/useData";
import { useEffect, useState } from "react";

function ProjectDetails() {
  const { id } = useParams();
  const { sectionData } = useData();
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);

  const project = sectionData.projects.find((p) => p.id === Number(id));

  function handleNext() {
    setCurrentIndex((prev) =>
      prev === project.images.length - 1 ? 0 : prev + 1,
    );
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === project.images.length - 1 ? 0 : prev + 1,
      );
    }, 6000); // 6 sec

    return () => clearInterval(interval);
  }, [project.images.length]);

  function handlePrev() {
    setCurrentIndex((prev) =>
      prev === project.images.length - 1 ? 0 : prev - 1,
    );
  }

  if (!project) {
    return <p className="text-center mt-10">Project not found</p>;
  }

  return (
    <div className="max-w-5/6 mx-auto px-4 py-5">
      <button
        onClick={() => navigate(-1)}
        className="mb-8 text-md text-neutral-400 hover:text-white transition"
      >
        ← Back
      </button>
      <div className="flex flex-col gap-8 bg-neutral-900 border border-neutral-700 rounded-2xl p-6 shadow-lg">
        {/* Title */}
        <h1 className="text-3xl font-bold mb-2">{project.name}</h1>

        {/* Tagline */}
        <p className="text-neutral-400 mb-6">{project.tagline}</p>

        {/* Links */}
        <div className="flex gap-4 mb-6">
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-green-600 rounded-lg text-white hover:bg-green-500 transition"
            >
              🚀 Live Demo
            </a>
          )}

          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gray-700 rounded-lg text-white hover:bg-gray-600 transition"
            >
              💻 GitHub
            </a>
          )}
        </div>

        {/* images */}

        <div className="relative w-full max-w-7xl my-10">
          <img 
            src={project.images[currentIndex]}
            className="w-full h-full object-cover rounded-xl"
          />

          {/* Prev */}
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 text-white px-3 py-1 rounded"
          >
            ◀
          </button>

          {/* Next */}
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 text-white px-3 py-1 rounded"
          >
            ▶
          </button>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">About</h2>
          <p className="text-neutral-300 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.tech_stack.map((item, index) => (
              <span
                key={index}
                className="px-4 py-1.5 text-sm rounded-full bg-gradient-to-r from-neutral-800 to-neutral-700 border border-neutral-600 hover:scale-105 transition"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Features */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Features</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {project.features.map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-neutral-800/60 border border-neutral-700 hover:border-neutral-500 transition"
              >
                <p className="text-sm text-neutral-300">✨ {item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;
