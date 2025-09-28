import { useState } from 'react';
import type { Project } from './Project';
import ProjectCard from './ProjectCard';
import ProjectForm from './ProjectForm';

//ProjectListProps used to mention the type of the props of passed project data
interface ProjectListProps {
    projects: Project[];  //array of projects
    onSave: (project: Project) => void //function to save a project
}

const ProjectList = ({ projects, onSave }: ProjectListProps) => {
    // Props are passed here  and the interface is mentioned with destructuring

    const [projectBeingEdited, setProjectBeingEdited] = useState<Project | undefined>()
    // state to keep track of which project is being edited
    // initially no project is being edited so undefined
    // when a project is being edited the state is set to that project object
    // when no project is being edited the state is set to undefined

    const cancelEditing = () => {
        //function to cancel the editing of the project
        setProjectBeingEdited({})

    }

    //this is the  function in parent component used to change the edit of the card component
    const handleEdit = (project: Project) => {
        // console.log(project)
        setProjectBeingEdited(project);// setting the project being edited to the project passed from the child component
    }

    return (

        <div
            className="row">

            {/* the passed mock data is mapped or iterated here and passed to the Project Card component as props*/}

            {
                projects.map((project) => (
                    //Iterates over all projects. Each project is passed to a ProjectCard component.
                    // Each ProjectCard component is given a unique key based on the project's id.
                    // The onEdit function is passed to each ProjectCard to handle editing actions.
                    // If a project is being edited, a ProjectForm component is rendered instead of the ProjectCard.
                    // The ProjectForm component receives the project data and functions for saving and canceling edits.
                    <div
                        key={project.id}
                        className="cols-sm"
                    >

                        { // Ternary operator to check if the current project is being edited
                            project === projectBeingEdited ? 
                                (
                                    // if the project is being edited show the form component
                                    // and pass the project being edited as props

                                    <ProjectForm
                                        onCancel={cancelEditing}
                                        onSave={onSave}
                                        project={project}
                                    />

                                )

                                :

                                ( 
                                    // else show the project card component
                                    <ProjectCard
                                        project={project}
                                        onEdit={handleEdit}
                                    />
                                )
                        }

                    </div>
                ))}
        </div>


    )
}

export default ProjectList