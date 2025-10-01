import type { Project } from './Project';
import { motion } from "framer-motion";
import { Link } from 'react-router';

function formatDescription(description: string): string {
    return description.substring(0, 60) + '...';
}

interface ProjectCardProps {
    project: Project;
    onEdit: (project: Project) => void;
}
const ProjectCard = ({ project, onEdit }: ProjectCardProps) => {
    const handleEditClick = (projectBeingEdited: Project) => {
        onEdit(projectBeingEdited)
    }

    return (
        <motion.div className="card" transition={{ duration: 0.1 }} whileHover={{
            opacity: 1,
            scale: 1,
            boxShadow: "0px 2px 3px #222",
        }}>
            <img src={project.imageUrl} alt={project.name} />
            <section className="section dark">
                <Link to={'/projects/' + project.id}>
                    <h5 className="strong">
                        <strong>{project.name}</strong>
                    </h5>
                </Link>
                <p>{formatDescription(project.description)}</p>
                <p>Budget : {project.budget.toLocaleString('en-US', { style: 'currency', currency: 'INR' })}/-</p>
                <p>Status : {project.isActive ? 'Active' : 'Inactive'}</p>
                <motion.button
                    className='bordered'
                    onClick={() => handleEditClick(project)} //
                    whileHover={{
                        opacity: 1,
                        scale: 1,
                        boxShadow: "0px 2px 2px #222",
                    }}>
                    <span className='icon-edit'></span>
                    Edit
                </motion.button>
            </section>
        </motion.div>
    )
}

export default ProjectCard