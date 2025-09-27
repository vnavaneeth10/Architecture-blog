import { useState } from 'react';
import type { Project } from './Project';
import ProjectCard from './ProjectCard';
import ProjectForm from './ProjectForm';

//ProjectListProps used to mention the type of the props of passed project data
interface ProjectListProps {
    projects: Project[];  //since it is in array format hence mentioned in array format
    onSave: (project: Project) => void
}

const ProjectList = ({ projects, onSave }: ProjectListProps) => {
    // Props are passed here  and the interface is mentioned with destructuring

    const [projectBeingEdited, setProjectBeingEdited] = useState()

    const cancelEditing = () => {
        setProjectBeingEdited({})
    }
    //this is the  function in parent component used to change the edit of the card component
    const handleEdit = (project: Project) => {
        // console.log(project)
        setProjectBeingEdited(project);
    }

    return (
        <div className="row">
            {/* the passed mock data is mapped or iterated here and passed to the Project Card component as props*/}

            {projects.map((project) => (

                <div key={project.id} className="cols-sm">
                    {
                        project === projectBeingEdited ? (<ProjectForm onCancel={cancelEditing} onSave={onSave} />) : (<ProjectCard project={project} onEdit={handleEdit} />)
                    }


                    {/* function and iterated data is passed as props */}

                    {/* this is the form component which is a child one */}
                </div>
            ))}
        </div>


    )
}

export default ProjectList