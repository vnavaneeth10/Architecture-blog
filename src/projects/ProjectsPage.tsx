// //import { MOCK_PROJECTS } from './MockProjects'
// import ProjectList from './ProjectList';
// // import  { Project } from './Project';
// // import { useState, useEffect } from 'react';
// import { projectAPI } from './projectAPI';
// // import Hello from '../Hello';
// import { useProjects } from './projectHooks';

// function ProjectsPage() {

//   // const [projects, setProjects] = useState<Project[]>([]);
//   // const [loading, setLoading] = useState(false);
//   // const [error, setError] = useState<string | undefined>(undefined);
//   // const [currentPage, setCurrentPage] = useState(1);

//   const {
//    projects,
//    loading,
//     error,
//     setCurrentPage,
//     saveProject,
//     saving,
//     savingError,
//   } = useProjects();

//   const handleMoreClick = () => {
//     setCurrentPage((currentPage) => currentPage + 1)
//   }

//   // useEffect(() => {
//   //   async function loadProjects() {
//   //     setLoading(true);
//   //     try {
//   //       // const data = await projectAPI.get(1);
//   //       const data = await projectAPI.get(currentPage);
//   //       // if the data is fetched successfully clear any previous error
//   //       setError('');
//   //       // setProjects(data);
//   //       if (currentPage === 1) {
//   //         setProjects(data);
//   //       } else {
//   //         setProjects((projects) => [...projects, ...data]);
//   //       }
//   //     } catch (e) {
//   //       if (e instanceof Error) {
//   //         setError(e.message)
//   //       }
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   }
//   //   loadProjects();
//   //   // },[])
//   // }, [currentPage]);

//   // const saveProject = (project: Project) => {
//   //   // console.log('saving project :', project)
//   //   // let updatedProjects = projects.map((p: Project) => {
//   //   //   return p.id === project.id ? project : p;
//   //   // });
//   //   // setProjects(updatedProjects);

//   //   projectAPI
//   //     .put(project)
//   //     .then((updatedProject) => {
//   //       // const updatedProjects = projects.map((p: Project) => {
//   //       //   return p.id === project?.id ? new Project(updatedProject) : p;
//   //       // });
//   //     //   const updatedProjects = projects.map((p: Project) => 
//   //     //   p.id === project.id ? updatedProject : p
//   //     // );
//   //     // const updatedProjects = projects.map((p: Project) => 
//   //     //   p.id === project.id ? updatedProject : p
//   //     // );
//   //     const updatedProjects = projects.map((p: Project) =>
//   //       p.id === project.id ? new Project(updatedProject) : p
//   //     );
//   //       setProjects(updatedProjects);
//   //     })
//   //     .catch((e) => {
//   //       if (e instanceof Error) {
//   //         setError(e.message);
//   //       }
//   //     });

//   // }


//   return (
//     <>
//     <h1>projects</h1>
//     {saving && <span className='toast'>Saving....</span>}
//       {error && (<div className="row">
//         <div className="card large error">
//           <section>
//             <p>
//               <span className="icon-alert inverse "></span>
//               {error}
//             </p>
//           </section>
//         </div>
//       </div>)}

//       {savingError && (
//           <div className="card large error">
//            <section>
//               <p>
//                <span className="icon-alert inverse "></span>
//                 {savingError}
//              </p>
//            </section>
//           </div>
//         )}

//       <ProjectList 
//       projects={projects} />
//       {/* <ProjectList 
//       onSave={saveProject} 
//       projects={projects} /> */}
//       {/* <ProjectList projects={MOCK_PROJECTS} onSave={saveProject}/> */}
//       {/* passing the mock data to Project List component */}
//       {/* <Hello/> */}
//       {
       // // !loading && !error && (
//           <div className='row'>
//             <div className='col-sm-12'>
//               <div className='button-group fluid'>

//                 <button
//                   className='button default'
//                   onClick={handleMoreClick}>
//                   More...
//                 </button>

//               </div>
//             </div>
//           </div>
//         )
//       }
//       {loading && (<div className='center-page'>
//         <span className='spinner primary'></span>
//         <p>Loading....</p>
//       </div>)}
//     </>
//   );
// }

// export default ProjectsPage


import React, { useEffect } from 'react';
import { useProjects } from './projectHooks';
import ProjectList from './ProjectList';
import { useDispatch, useSelector } from 'react-redux';
import type { AppState } from '../state';
import { loadProjects } from './state/projectActions';
 import { AnyAction } from 'redux';
 import { ThunkDispatch } from 'redux-thunk';
 import { ProjectState } from './state/projectTypes';

function ProjectsPage() {

  const loading = useSelector(
   (appState: AppState) => appState.projectState.loading
 );
  const projects = useSelector(
    (appState: AppState) => appState.projectState.projects
  );
 const error = useSelector(
   (appState: AppState) => appState.projectState.error
  );
  const currentPage = useSelector(
    (appState: AppState) => appState.projectState.page
  );
  const dispatch = useDispatch<ThunkDispatch<ProjectState, any, AnyAction>>();






  const {
    data,
    isPending,
    error,
    isError,
    isFetching,
    page,
    setPage,
    isPreviousData,
  } = useProjects();

  useEffect(() => {
    dispatch(loadProjects(1));
  }, [dispatch]);
const handleMoreClick = () => {
   
    dispatch(loadProjects(currentPage + 1));
  };

  return (
    <>
      <h1>Projects</h1>

      {data ? (
        <>
          {isFetching && !isPending && (
            <span className="toast">Refreshing...</span>
          )}
          <ProjectList projects={projects} />
           {/* <ProjectList projects={data} /> */}
          <div className="row">
            <div className="col-sm-4">Current page: {page + 1}</div>
            <div className="col-sm-4">
              <div className="button-group right">
                <button
                  className="button "
                  onClick={() => setPage((oldPage) => oldPage - 1)}
                  disabled={page === 0}
                >
                  Previous
                </button>
                <button
                  className="button"
                  onClick={() => {
                    if (!isPreviousData) {
                      setPage((oldPage) => oldPage + 1);
                    }
                  }}
                  disabled={data.length != 10}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </>
      ) : isPending ? (
        <div className="center-page">
          <span className="spinner primary"></span>
          <p>Loading...</p>
        </div>
      ) : isError && error instanceof Error ? (
        <div className="row">
          <div className="card large error">
            <section>
              <p>
                <span className="icon-alert inverse "></span>
                {error.message}
              </p>
            </section>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default ProjectsPage;

// this commented code is unnecessary it's just here to show you the pattern
// return (
//   <>
//     <h1>Header</h1>
//     {data ? (
//       <p>data</p>
//     ) : isLoading ? (
//       <p>Loading...</p>
//     ) : isError ? (
//       <p>Error Message</p>
//     ) : null}
//   </>
// );