//importing the project data
import type { Project } from './Project';

function formatDescription(description: string): string {
    return description.substring(0, 60) + '...';
    // this function is used to limit the description characters to max 60 and ends up with ...
}

//interface type used to define the props from  ProjectList component
interface ProjectCardProps {
    project: Project;
    //passed mock data is mentioned here and type 
    onEdit: (project: Project) => void;
    // edit function used to edit the icon 
}

const ProjectCard = ({ project, onEdit }: ProjectCardProps) => {
    const handleEditClick = (projectBeingEdited: Project) => {
        
        onEdit(projectBeingEdited)
        //
    }
    return (
        <div className="card">
            <img src={project.imageUrl} alt={project.name} />
            <section className="section dark">
                <h5 className="strong">
                    <strong>{project.name}</strong>
                </h5>
                {/* this is the function which when called limits the description length and ends up with ... when exceeded the limit */}
                <p>{formatDescription(project.description)}</p>
                {/* this budget is reworked and DISPLAYED WITH LOCAL RULES AND IN RUPEES*/}
                <p>Budget : {project.budget.toLocaleString('en-US', { style: 'currency', currency: 'INR' })}/-</p>


                <button className='bordered' onClick={() => handleEditClick(project)}>
                    {/* this button is to edit the card component with the click function and edit button */}
                    <span className='icon-edit'></span>
                    Edit
                </button>
            </section>
        </div>
    )
}

export default ProjectCard