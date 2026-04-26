import { useEffect, useState } from "react";

import { getHero } from "../../features/home/apiHome";
import { getExperience } from "../../features/experience/apiExperience";
import { getSkills } from "../../features/skills/apiSkills";
import { getAbout } from "../../features/about/apiAbout";
import { getProject } from "../../features/projects/apiProject";

import { DataContext } from "./DataContext";

export function DataProvider({ children }) {
  const [sectionData, setSectionData] = useState({
    home: null,
    experience: [],
    skills: [],
    about: [],
    projects: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadAllSections() {
      setIsLoading(true);
      const [homeRes, expRes, skillRes, aboutRes, projectRes] =
        await Promise.all([
          getHero(),
          getExperience(),
          getSkills(),
          getAbout(),
          getProject(),
        ]);

      setSectionData({
        home: homeRes,
        experience: expRes,
        skills: skillRes,
        about: aboutRes,
        projects: projectRes,
      });
      setIsLoading(false);
    }
    loadAllSections();
  }, []);

  const value = { sectionData, setSectionData, isLoading };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
