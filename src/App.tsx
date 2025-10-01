import './App.css'
// import Hello from './Hello'
import ProjectsPage from './projects/ProjectsPage'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router'
import HomePage from './home/HomePage'
import ProjectPage from './projects/ProjectPage'

function App() {
  return (
    <>
      
      {/* <Hello name="Navaneeth" enthusiasmLevel={2}/> */}
      <BrowserRouter>

        <header className='sticky'>

          <span className='logo'>

            <img 
            src='/assets/logo-3.svg' 
            alt='logo' 
            width='49' 
            height='99' />

          </span>

          <NavLink 
          to='/' 
          className='button rounded'>

          <span 
          className='icon-home'>
            </span>

            Home

            </NavLink>

            <NavLink 
          to='/projects' 
          className='button rounded'>

          

            Projects

            </NavLink>

        </header>

        <div className='container'>

          <Routes>

            <Route path='/' element={<HomePage />} />
            <Route path='/projects' element={<ProjectsPage />} />
             <Route path='/projects/:id' element={<ProjectPage />} />
          </Routes>
        </div>
      </BrowserRouter>

      {/* <ProjectsPage /> */}
    </>
  )
}

export default App
