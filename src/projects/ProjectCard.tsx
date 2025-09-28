//importing the project data
import type { Project } from './Project'; //importing the project type
import { motion } from "framer-motion";//importing motion for animation

function formatDescription(description: string): string {
    //function to limit the description length
    return description.substring(0, 60) + '...';

}

//interface type used to define the props from  ProjectList component

interface ProjectCardProps {
    project: Project;
    //passed mock data is mentioned here and type 
    onEdit: (project: Project) => void;
    // edit function used to edit the icon 
}

const ProjectCard = ({ project, onEdit }: ProjectCardProps) => {
    //destructuring the props passed from ProjectList component

    //function to handle the edit button click
    const handleEditClick = (projectBeingEdited: Project) => {
        onEdit(projectBeingEdited)
        // calling the onEdit function passed from ProjectList component
    }

    return (
        //motion div is used for animation
        <motion.div className="card" transition={{ duration: 0.1 }} whileHover={{
            opacity: 1,
            scale: 1,
            boxShadow: "0px 2px 3px #222",
        }}>
            <img src={project.imageUrl} alt={project.name} />

            <section className="section dark">

                {/* project name is displayed here */}

                <h5 className="strong">
                    <strong>{project.name}</strong>
                </h5>

                {/* this is the function which when called limits the description length and ends up with ... when exceeded the limit */}

                <p>{formatDescription(project.description)}</p>


                {/*  toLocaleString is used to format the number according to the local rules
                 //here 'en-US' is used to format the number in US English style
                // style is set to currency and currency is set to INR for Indian Rupees
                // /- is added at the end to denote the amount in rupees */}

                <p>Budget : {project.budget.toLocaleString('en-US', { style: 'currency', currency: 'INR' })}/-</p>

                {/* ternary operator to check if the project is active or not and display accordingly */}
                <p>Status : {project.isActive ? 'Active' : 'Inactive'}</p>
                <motion.button
                    className='bordered'
                    onClick={() => handleEditClick(project)} //
                    whileHover={{
                        opacity: 1,
                        scale: 1,
                        boxShadow: "0px 2px 2px #222",
                    }}>
                    {/* this button is to edit the card component with the click function and edit button */}
                    <span className='icon-edit'></span>
                    Edit
                </motion.button>

            </section>
        </motion.div>
    )
}

export default ProjectCard