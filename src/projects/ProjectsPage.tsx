import { MOCK_PROJECTS } from './MockProjects'
import ProjectList from './ProjectList';
import type { Project } from './Project';
import Hello from '../Hello';

function ProjectsPage() {
  const saveProject = (project:Project) =>{
      console.log('saving project :', project)
  }
  return (
    <>

      <ProjectList projects={MOCK_PROJECTS} onSave={saveProject}/>
      {/* passing the mock data to Project List component */}
      <Hello/>
    </>
  );
}

export default ProjectsPage