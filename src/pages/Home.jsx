import { formatDate } from "../utils/formatDate";
import { useData } from "../context/data/useData";
import Loading from "../ui/Loading";

function Home() {
  const { sectionData, isLoading } = useData();

  const hero = sectionData.home;
  const experience = sectionData.experience;
  const skills = sectionData.skills;

  if (isLoading) return <Loading />;

  return (
    <div>
      <section id=" intro" className="border-b border-neutral-600 pb-8">
        <h1 className="text-2xl font-bold mb-3 ">{hero?.name} </h1>
        <p className=" text-xl mb-5  pb-3">{hero?.title}</p>
        <p>{hero?.description}</p>
      </section>
      <section className="border-b border-neutral-600 py-8">
        <h1 className="text-2xl font-bold mb-3  ">Experience</h1>
        <section id="experience" className="py-3">
          <div>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-10">
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
                <ul className="list-disc pl-5  space-y-2">
                  {exp.description.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </section>

      <section id="skills" className="border-b border-neutral-600 py-8">
        <h1 className="text-2xl font-bold mb-3  ">Skills & technologies</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="border border-neutral-600 p-6 rounded-2xl hover:border-neutral-400 transition"
            >
              <h1 className="text-2xl font-bold mb-3 pb-2">
                {skill.skill_category}
              </h1>
              <ul className="list-disc pl-5  space-y-2">
                {skill.skills.map((skills, index) => (
                  <li key={index}>{skills}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
