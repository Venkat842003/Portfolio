import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import AppLayout from "../Pages/AppLayout";
import Home from "../Pages/Home";
import About from "../Pages/About";
import Contact from "../Pages/Contact";
import Projects from "../Pages/Projects";
import Error from "../ui/Error";
import Signin from "../Pages/Signin";
import Dashboard from "../Pages/Dashboard";
import HomeEditor from "../features/home/HomeEditor";
import ProtectedRoute from "../routes/ProtectedRoute";
import { DataProvider } from "../context/data/DataProvider";
import SkillEditor from "../features/skills/SkillEditor";
import Skills from "../features/skills/Skills";
import Experience from "../features/experience/Experience";
import ExpEditor from "../features/experience/ExpEditor";
import Overview from "../components/Overview";
import AboutEditor from "../features/about/AboutEditor";
import UnderConstruction from "../Pages/UnderConstruction";
import ProjectDetails from "../features/projects/ProjectDetails";
import ProjectEditor from "../features/projects/ProjectEditor";
import ProjectEditForm from "../features/projects/ProjectEditForm";
import EditProjectPage from "../features/projects/EditProjectPage";
import AddProjectsPage from "../features/projects/AddProjectsPage";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,

    children: [
      { index: true, element: <Home /> },

      { path: "*", element: <UnderConstruction /> },
      { path: "about", element: <About /> },
      { path: "projects", element: <Projects /> },
      { path: "projects/:id", element: <ProjectDetails /> },

      { path: "contact", element: <Contact /> },
      { path: "signin", element: <Signin /> },

      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
            children: [
              { index: true, element: <Navigate to="content/home" replace /> },

              {
                path: "content",
                element: <Outlet />, // or ContentLayout
                children: [
                  { index: true, element: <HomeEditor /> },
                  { path: "home", element: <HomeEditor /> },
                  { path: "about", element: <AboutEditor /> },
                  { path: "skills", element: <Skills /> },
                  { path: "skills/:id", element: <SkillEditor /> },
                  { path: "experience", element: <Experience /> },
                  { path: "experience/:id", element: <ExpEditor /> },
                  { path: "projects", element: <ProjectEditor /> },
                  { path: "projects/new", element: <AddProjectsPage /> },
                  { path: "projects/:id", element: <EditProjectPage /> },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <DataProvider>
      <RouterProvider router={router} />
    </DataProvider>
  );
}

export default App;
