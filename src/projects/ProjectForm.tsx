import type { SyntheticEvent } from "react"
import { Project } from "./Project"


interface ProjectFormProps {
    onSave:(project:Project)=>void
    onCancel:()=>void
}
const ProjectForm = ({onSave,onCancel}:ProjectFormProps) => {
    // thi is the form component

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
                    <button className="primary bordered medium">Save</button>
                    <span></span>
                    {/* Button to cancel*/}
                    <button type="button" className="bordered medium" onClick={onCancel}>cancel</button>
                </div>
            </form>
        </>
    )
}

export default ProjectForm