import { useState } from 'react';
import type { Project } from './Project';
import ProjectCard from './ProjectCard';
import ProjectForm from './ProjectForm';

interface ProjectListProps {
    projects: Project[];
}

const ProjectList = ({ projects }: ProjectListProps) => {

    const [projectBeingEdited, setProjectBeingEdited] = useState<Project | null>(null)

    const cancelEditing = () => {
        setProjectBeingEdited(null)
    }

    const handleEdit = (project: Project) => {
        setProjectBeingEdited(project);
    }

    return (
        <div
            className="row">
            {
                projects.map((project) => (
                    <div
                        key={project.id}
                        className="cols-sm"
                    >
                        {
                            projectBeingEdited?.id === project.id ?
                                (
                                    <ProjectForm
                                        onCancel={cancelEditing}

                                        project={project}
                                    />
                                )
                                :
                                (
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