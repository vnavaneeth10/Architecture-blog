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
        if (!isValid()) return;
        // if the form is not valid do not submit
        onSave(project!) // call the onSave function passed as a prop with the project being edited or added
        // the ! is used to tell TypeScript that we are sure that project is not undefined
        // because when adding a new project the initialProject is {} and when editing a project the initialProject is that project object
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
            //console.log("p", p)
            //console.log(" b4 updatedProject", updatedProject)
            updatedProject = new Project({ ...p, ...change })
            //console.log("after updatedProject", updatedProject)
            return updatedProject
        })
        // setting the project state to the updated project object
        setErrors(() => validate(updatedProject))

    }


    function validate(project: Project) {

        const errors: any = { // using any type for errors object
            name: '',
            description: '',
            budget: ''
        }; // object to hold the errors

        if (project.name.length === 0) {
            errors.name = 'Name is required';
        } // if name is empty set the error message

        if (project.name.length > 0 && project.name.length < 3) {
            errors.name = 'Name needs to be at least 3 characters long';
        } // if name is less than 3 characters set the error message

        if (project.description.length === 0) {
            errors.description = 'Description is required';
        } // if description is empty set the error message

        if (project.budget < 0) {
            errors.budget = 'Budget must be greater than $0'
        } // if budget is less than 0 set the error message

        return errors; // return the errors object
    }

    function isValid() {
        return (
            errors.name.length === 0 && // if there are no errors in any of the fields
            errors.description.length === 0 && // return true
            errors.budget.length === 0 // otherwise return false
        )
    } // function to check if the form is valid


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
                    value={project?.name}
                    onChange={handleChange}
                />

                {
                    errors.name.length > 0 && (
                        <div className="card error">
                            <p>{errors.name}</p>
                        </div>
                    )
                }

                {/* label of the description */}
                <label htmlFor="description">Project Description</label>
                {/* description text are content */}
                <textarea name="description" placeholder="enter description" value={project.description} onChange={handleChange} />

                {errors.description.length > 0 && (
                    <div className="card error">
                        <p>{errors.description}</p>
                    </div>
                )}

                {/*  if there is an error in the description field show the error message */}

                {/* label of the budget */}
                <label htmlFor="budget">Project Budget</label>
                {/* budget input area */}
                <input type="number" name="budget" placeholder="enter budget" value={project.budget} onChange={handleChange} />
                {
                    errors.budget.length > 0 && (
                        <div className="card error">
                            <p>{errors.budget}</p>
                        </div>
                    )
                }
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