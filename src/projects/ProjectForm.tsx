import { useState, type SyntheticEvent } from "react"
import { Project } from "./Project"
import { motion } from "framer-motion";



interface ProjectFormProps {
    // project is optional because when adding a new project there is no initial project
    // but when editing there is an initial project to edit
    // when no project is being edited the value is undefined
    // when adding a new project the value is {}
    // when editing a project the value is that project object
    project?: Project;

    onSave: (project: Project) => void
    // function to save the project
    onCancel: () => void
    // function to cancel the editing
}
const ProjectForm = ({
    project: initialProject,
    onSave,
    onCancel
}: ProjectFormProps) => {
    // if there is no initial project (when adding a new project) set the initial project to an empty object
    const [project, setProject] = useState(initialProject)
    // state to keep track of the project being edited or added
    const [errors, setErrors] = useState({
        name: '',
        description: '',
        budget: ''
    }) // state to keep track of the errors in the form fields

    const handleSubmit = (e: SyntheticEvent) => {
        //function to handle the form submission
        e.preventDefault();
        // onSave(new Project({ name: 'Updated Project' }))
        onSave(project);
    }

    const handleChange = (event: any) => {
        // console.log(event.target.value);
        const { type, name, value, checked } = event.target;
        // if input type is checkbox use checked
        // otherwise it's type is text, number etc. so use value
        let updatedValue = type === 'checkbox' ? checked : value;
        // getting the updated value from the input field

        //  getting the name of the input field
        // name attribute of the input field is used to identify the input field
        // this is used to update the corresponding property of the project object


        //if input type is number convert the updatedValue string to a number
        if (type === 'number') {
            updatedValue = Number(updatedValue);
        }

        const change = {
            [name]: updatedValue,
        }

        let updatedProject: Project;
        // variable to hold the updated project object

        // need to do functional update b/c
        // the new project state is based on the previous project state
        // so we can keep the project properties that aren't being edited like project.id
        // the spread operator (...) is used to  spread the previous project properties and the new change

        setProject((p) => {
            console.log("p", p)
            console.log(" b4 updatedProject", updatedProject)
            updatedProject = new Project({ ...p, ...change })
            console.log("after updatedProject", updatedProject)
            return updatedProject
        })
        // setting the project state to the updated project object


    }


    return (
        <>
            <form
                className="input-group vertical"
                onSubmit={handleSubmit}
            >
                {/* label of the name */}

                <label
                    htmlFor="name"
                >Project Name
                </label>

                {/* input type name */}

                <input
                    type="text"
                    name="name"
                    placeholder="enter name"
                    value={project.name}
                    onChange={handleChange}
                />

                {/* label of the description */}
                <label htmlFor="description">Project Description</label>
                {/* description text are content */}
                <textarea name="description" placeholder="enter description" value={project.description} onChange={handleChange} />
                {/* label of the budget */}
                <label htmlFor="budget">Project Budget</label>
                {/* budget input area */}
                <input type="number" name="budget" placeholder="enter budget" value={project.budget} onChange={handleChange} />
                {/* label of the checkbox */}
                <label htmlFor="isActive">Active?</label>
                {/* checkbox input element */}
                <input type="checkbox" name="isActive" checked={project.isActive} onChange={handleChange} />

                <div className="input-group">
                    {/* Button to save the filled form data */}
                    <motion.button
                        className="primary bordered medium"
                        whileHover={{
                            opacity: 1,
                            scale: 1,
                            boxShadow: "0px 2px 2px #222",
                        }}>
                        Save
                    </motion.button>

                    <span></span>

                    {/* Button to cancel*/}
                    <motion.button
                        type="button"
                        className="bordered medium"
                        onClick={onCancel}
                        whileHover={{
                            opacity: 1,
                            scale: 1,
                            boxShadow: "0px 2px 2px #222",
                        }}>Cancel
                    </motion.button>

                </div>
            </form>
        </>
    )
}

export default ProjectForm