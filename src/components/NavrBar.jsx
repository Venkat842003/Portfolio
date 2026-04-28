import { NavLink } from "react-router-dom";
import { useAuth } from "../context/auth/useAuth";

function NavrBar({ isMobile = false, setOpen }) {
  const { session } = useAuth();

  const sections = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div
      className={`flex ${isMobile && "flex-col"} justify-center gap-3 sm:gap-5 text-base sm:text-lg font-medium`}
    >
      {sections.map((section) => (
        <NavLink
          to={section.path}
          key={section.name}
          onClick={() => setOpen?.(false)}
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
          onClick={() => setOpen?.(false)}
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
