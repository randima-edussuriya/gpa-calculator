import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import './App.css'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import ModuleForm from './components/ModuleForm'
import ModuleTable from './components/ModuleTable'
import StaticCards from './components/StaticCards'
import OffCanvas from './components/OffCanvas'
import GradingAndOtherSystem from './components/GradingAndOtherSystem'
import Footer from './components/Footer'
import { gradingSystem, classSystem } from './Constants/systemData'
import DarkModeToggle from './components/DarkModeToggle'

function App() {
  const [formData, setFormData] = useState({
    moduleTitle: '',
    credit: '',
    grade: '',
  })

  const [modules, setModules] = useState([]);

  const handleChange = (e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  })

  const handleSubmit = (e) => {
    const theme = localStorage.getItem('theme');
    e.preventDefault();
    if (!formData.moduleTitle || !formData.credit | !formData.grade) {
      toast.error('Please fill all fields', { autoClose: 2500, theme: `${theme}` })
      return
    }
    setModules(prev => ([...prev, {
      moduleTitle: formData.moduleTitle,
      credit: parseFloat(formData.credit),
      grade: formData.grade,
    }]))

    setFormData({
      moduleTitle: '',
      credit: '',
      grade: '',
    })
  }

  const handleRemove = async (index) => {
    const theme = localStorage.getItem('theme');

    const confirm = await Swal.fire({
      customClass: {
        confirmButton: 'btn btn-dark',
        cancelButton: 'btn btn-danger',
        title: 'h4',
      },
      title: "Are you sure?",
      showCancelButton: true,
      confirmButtonText: "Remove",
      width: '15em',
      theme: `${theme}`
    })

    if (!confirm.isConfirmed) return;

    const updatedModules = [...modules];
    updatedModules.splice(index, 1);
    setModules(updatedModules);
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container fluid className='bg-dark-subtle d-flex flex-column min-vh-100 position-relative'>
      {/* ---------------------------------------------------------------------
            Top menu icons
        ----------------------------------------------------------------------- */}
      <Container fluid className='position-absolute end-0 d-flex gap-3 justify-content-end pt-2 pe-3'>
        <DarkModeToggle />
        <i className="topMenuIcon bi bi-question-circle fs-2" onClick={handleShow}></i>
      </Container>
      {/* ----------------------------------------------------------------------
              Offcanvas for Privacy Policy
        -------------------------------------------------------------------------- */}
      <OffCanvas show={show} handleClose={handleClose} />

      <Container className='flex-grow-1'>
        {/* ----------------------------------------------------------------------
              Add module section
        -------------------------------------------------------------------------- */}
        <Container className='pt-3' >
          <ModuleForm formData={formData} gradingSystem={gradingSystem} handleSubmit={handleSubmit} handleChange={handleChange} />
        </Container>

        {modules.length !== 0 && (
          <>
            {/* ----------------------------------------------------------------------
              Statics Card Section
            -------------------------------------------------------------------------- */}
            <Container className='mt-4'>
              <StaticCards modules={modules} classSystem={classSystem} gradingSystem={gradingSystem} />
            </Container>
            {/* ----------------------------------------------------------------------
              Modules Tabel Section
            -------------------------------------------------------------------------- */}
            <Container className='mt-4'>
              <ModuleTable modules={modules} handleRemove={handleRemove} />
            </Container>
          </>
        )}
        {/* ----------------------------------------------------------------------
              Grading System, Awarding of classes, GPA Formular section
        -------------------------------------------------------------------------- */}
        <Container className='mt-4'>
          <GradingAndOtherSystem gradingSystem={gradingSystem} classSystem={classSystem} />
        </Container>
      </Container>
      {/* ----------------------------------------------------------------------
              Footer Section
        -------------------------------------------------------------------------- */}
      <Footer />
    </Container>
  )
}

export default App