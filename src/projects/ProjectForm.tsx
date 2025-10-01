import { useState, type SyntheticEvent } from "react"
import { Project } from "./Project"
import { motion } from "framer-motion";
import { useSaveProject } from './projectHooks';


interface ProjectFormProps {
    project?: Project;
    onCancel: () => void
}
const ProjectForm = ({
    project: initialProject,

    onCancel
}: ProjectFormProps) => {

    const [project, setProject] = useState(initialProject)

    const [errors, setErrors] = useState({
        name: '',
        description: '',
        budget: ''
    })
    const { mutate: saveProject, isPending } = useSaveProject();
    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        if (!isValid()) return;
        saveProject(project!);
    }

    const handleChange = (event: any) => {
        const { type, name, value, checked } = event.target;
        let updatedValue = type === 'checkbox' ? checked : value;
        if (type === 'number') {
            updatedValue = Number(updatedValue);
        }
        const change = {
            [name]: updatedValue,
        }
        let updatedProject: Project;
        setProject((p) => {
            updatedProject = new Project({ ...p, ...change })
            return updatedProject
        })
        setErrors(() => validate(updatedProject))
    }


    function validate(project: Project) {

        const errors: any = {
            name: '',
            description: '',
            budget: ''
        };

        if (project.name.length === 0) {
            errors.name = 'Name is required';
        }

        if (project.name.length > 0 && project.name.length < 3) {
            errors.name = 'Name needs to be at least 3 characters long';
        }

        if (project.description.length === 0) {
            errors.description = 'Description is required';
        }

        if (project.budget < 0) {
            errors.budget = 'Budget must be greater than $0'
        }

        return errors;
    }

    function isValid() {
        return (
            errors.name.length === 0 &&
            errors.description.length === 0 &&
            errors.budget.length === 0
        )
    }


    return (
        <>
            <form
                className="input-group vertical"
                onSubmit={handleSubmit}
            >
                {isPending && <span className="toast">Saving...</span>}

                <label
                    htmlFor="name"
                >Project Name
                </label>

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

                <label htmlFor="description">Project Description</label>
                <textarea name="description" placeholder="enter description" value={project?.description} onChange={handleChange} />

                {errors.description.length > 0 && (
                    <div className="card error">
                        <p>{errors.description}</p>
                    </div>
                )}

                <label htmlFor="budget">Project Budget</label>
                <input type="number" name="budget" placeholder="enter budget" value={project?.budget} onChange={handleChange} />
                {
                    errors.budget.length > 0 && (
                        <div className="card error">
                            <p>{errors.budget}</p>
                        </div>
                    )
                }
                <label htmlFor="isActive">Active?</label>
                <input type="checkbox" name="isActive" checked={project?.isActive} onChange={handleChange} />

                <div className="input-group">
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