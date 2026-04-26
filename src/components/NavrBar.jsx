import { NavLink } from "react-router-dom";
import { useAuth } from "../context/auth/useAuth";

function NavrBar() {
  const { session } = useAuth();

  const sections = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div className=" flex gap-7  text-xl font-medium">
      {sections.map((section) => (
        <NavLink
          to={section.path}
          key={section.name}
          className={({ isActive }) =>
            `px-4 py-1 rounded-2xl transition-colors duration-300 ease-in-out ${
              isActive ? "bg-neutral-700  " : "hover:bg-neutral-600"
            }`
          }
        >
          {section.name}
        </NavLink>
      ))}
      {session && (
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `px-4 py-1 rounded-2xl transition-colors duration-300 ease-in-out ${
              isActive ? "bg-neutral-700  " : "hover:bg-neutral-600"
            }`
          }
        >
          Dashboard
        </NavLink>
      )}
    </div>
  );
}

export default NavrBar;
