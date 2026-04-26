import { NavLink, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  const isContentOpen = location.pathname.startsWith("/dashboard/content");

  const sections = [
    { path: "/dashboard/overview", label: "Overview" },
    { path: "/dashboard/analytics", label: "Analytics" },
    { path: "/dashboard/contacts", label: "Contacts" },
    {
      label: "Content Management",
      children: [
        { path: "/dashboard/content/home", label: "Home" },
        { path: "/dashboard/content/about", label: "About" },
        { path: "/dashboard/content/skills", label: "Skills" },
        { path: "/dashboard/content/experience", label: "Experience" },
        { path: "/dashboard/content/projects", label: "Projects" },
      ],
    },
    { path: "/dashboard/users", label: "Users" },
    { path: "/dashboard/settings", label: "Settings" },
  ];

  return (
    <div className="sticky top-16 flex flex-col gap-5 text-sm ">
      {sections.map((section, index) => {
        // If section has dropdown
        if (section.children) {
          return (
            <div key={index}>
              <NavLink
                to="/dashboard/content/home"
                className=" flex w-full text-left px-4 py-1 hover:bg-neutral-600"
              >
                {section.label}{" "}
                <span className="text-xs">{isContentOpen ? "▲" : "▼"}</span>
              </NavLink>

              {isContentOpen && (
                <div className="flex flex-col ml-4 gap-1">
                  {section.children.map((child) => (
                    <NavLink
                      key={child.path}
                      to={child.path}
                      className={({ isActive }) =>
                        `px-4 py-1 text-sm ${
                          isActive ? "bg-neutral-800" : "hover:bg-neutral-600"
                        }`
                      }
                    >
                      {child.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        }

        // Normal links
        return (
          <NavLink
            key={section.path}
            to={section.path}
            className={({ isActive }) =>
              `w-full text-left px-4 py-1 ${
                isActive ? "bg-neutral-800" : "hover:bg-neutral-600"
              }`
            }
          >
            {section.label}
          </NavLink>
        );
      })}
    </div>
  );
}

export default Sidebar;

/* Dashboard
 ├── Overview
 ├── Analytics
 ├── Contacts
 ├── Content
 │     ├── Home
 │     ├── Experience
 │     ├── Skills
 │     ├── Projects
 └── Settings */
