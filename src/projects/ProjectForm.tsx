import { useState, type SyntheticEvent } from "react"
import { Project } from "./Project"
import { motion } from "framer-motion";


interface ProjectFormProps {
    project?:Project;
    onSave:(project:Project)=>void
    onCancel:()=>void
}
const ProjectForm = ({project: initialProject,onSave,onCancel}:ProjectFormProps) => {
    //rename it initialProject so that we can name our state variable project
    // thi is the form component
    const [project,setProject] = useState(initialProject)

    const handleSubmit=(e:SyntheticEvent)=>{
        e.preventDefault();
        onSave(new Project({name: 'Updated Project'}))
    }

    
    return (
        <>
            <form className="input-group vertical" onSubmit={handleSubmit}>
                {/* label of the name */}
                <label htmlFor="name">Project Name</label>
                {/* input type name */}
                <input type="text" name="name" placeholder="enter name" />
                {/* label of the description */}
                <label htmlFor="description">Project Description</label>
                {/* description text are content */}
                <textarea name="description" placeholder="enter description"></textarea>
                {/* label of the budget */}
                <label htmlFor="budget">Project Budget</label>
                {/* budget input area */}
                <input type="number" name="budget" placeholder="enter budget" />
                {/* label of the checkbox */}
                <label htmlFor="isActive">Active?</label>
                {/* checkbox input element */}
                <input type="checkbox" name="isActive" />

                <div className="input-group">
                    {/* Button to save the filled form data */}
                    <motion.button className="primary bordered medium" whileHover={{
                opacity: 1,
                scale: 1,
                boxShadow: "0px 2px 2px #222",
            }}>Save</motion.button>
                    <span></span>
                    {/* Button to cancel*/}
                    <motion.button type="button" className="bordered medium" onClick={onCancel} whileHover={{
                opacity: 1,
                scale: 1,
                boxShadow: "0px 2px 2px #222",
            }}>cancel</motion.button>
                </div>
            </form>
        </>
    )
}

export default ProjectForm