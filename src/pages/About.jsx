import { useNavigate } from "react-router-dom";
import { useData } from "../context/data/useData";
import Button from "../ui/Button";
import Loading from "../ui/Loading";

function About() {
  const { sectionData, isLoading } = useData();

  const about = sectionData.about;

  const navigate = useNavigate();

 
if(isLoading) return <Loading />
  return (
    <div className="flex flex-col gap-5">
      {about.map((set) => (
        <div
          key={set.title}
          className=" border border-neutral-600 p-4 rounded-xl"
        >
          <h1 className="text-2xl font-bold py-4">{set.title}</h1>
          {set.content.split("\n\n").map((para, index) => (
            <p key={index} className="mb-4">
              {para}
            </p>
          ))}
        </div>
      ))}
      <div className="flex flex-col gap-5 items-center justify-center p-5">
        <h1 className="text-xl font-bold">
          If you'd like to connect, collaborate, or discuss opportunities, feel
          free to reach out.
        </h1>
        <Button variant="sky" onClick={() => navigate("/contact")}>
          Let's Connect
        </Button>
      </div>
    </div>
  );
}

export default About;
/* 
{
  I’m a Technical Support Engineer with over 2 years of experience supporting SaaS and HaaS products, specializing in troubleshooting complex software, hardware, and network-related issues in production environments. Through my work, I’ve developed strong analytical and problem-solving skills, collaborating closely with engineering and QA teams to diagnose root causes and improve system reliability.

Alongside my support experience, I’ve been actively building my skills in frontend development using React, JavaScript, and modern web technologies. I enjoy creating responsive user interfaces, integrating APIs, and developing scalable applications with clean and maintainable code. I’ve also worked with SQL and Supabase to build full-stack portfolio projects.

My technical background gives me a unique advantage as a developer — I understand real-world production issues, user pain points, and system behavior. I’m currently focused on transitioning into a Frontend or Full-Stack Developer role where I can contribute to building impactful, high-quality software products.

} */

/* About Me


↓
My Journey Into Development
↓
What I'm Currently Building
↓
Skills I'm Developing
↓
What Tech Support Taught Me
↓
Currently Learning
↓
Where I'm Headed
↓
Beyond Coding
↓
Let's Connect */
