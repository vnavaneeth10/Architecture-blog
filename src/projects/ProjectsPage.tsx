import { MOCK_PROJECTS } from './MockProjects'
import ProjectList from './ProjectList';
import type { Project } from './Project';
import { useState } from 'react';
// import Hello from '../Hello';

function ProjectsPage() {

  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const saveProject = (project:Project) =>{
      // console.log('saving project :', project)
    let updatedProjects = projects.map((p: Project) => {
      return p.id === project.id ? project : p;
       });
       setProjects(updatedProjects);
  }
  return (
    <>
      <ProjectList onSave={saveProject} projects={projects} />
      {/* <ProjectList projects={MOCK_PROJECTS} onSave={saveProject}/> */}
      {/* passing the mock data to Project List component */}
      {/* <Hello/> */}
    </>
  );
}

export default ProjectsPage