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
import NavBar from './components/Navigations/NavBar'
import ScrollToTop from './components/Navigations/ScrollToTop'

function App() {
  // form data
  const [formData, setFormData] = useState({
    moduleTitle: '',
    credit: '',
    grade: '',
  })

  // modules, user has added
  const [modules, setModules] = useState([]);

  // offcanvas
  const [show, setShow] = useState(false);

  // formdata change handler
  const handleChange = (e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  })

  // add module handler
  const handleSubmit = (e) => {
    const theme = localStorage.getItem('theme');
    e.preventDefault();
    // validate
    if (!formData.moduleTitle || !formData.credit | !formData.grade) {
      toast.error('Please fill all fields', { autoClose: 2500, theme: `${theme}` })
      return
    }
    // add user modules
    setModules(prev => ([...prev, {
      moduleTitle: formData.moduleTitle,
      credit: parseFloat(formData.credit),
      grade: formData.grade,
    }]))

    // reset form inputs
    setFormData({
      moduleTitle: '',
      credit: '',
      grade: '',
    })
  }

  // module remove handler
  const handleRemove = async (index) => {
    const theme = localStorage.getItem('theme');

    // show confirmation alert
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

    // remove module
    const updatedModules = [...modules];
    updatedModules.splice(index, 1);
    setModules(updatedModules);
  }

  // Offcanvas toggle handler
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <NavBar handleShow={handleShow} />
      <Container fluid className='mainContainer bg-dark-subtle d-flex flex-column min-vh-100 position-relative'>
        {/* ----------------------------------------------------------------------
              Offcanvas for Privacy Policy
        -------------------------------------------------------------------------- */}
        <OffCanvas show={show} handleClose={handleClose} />

        <Container className='flex-grow-1'>
          {/* ----------------------------------------------------------------------
              Add module section
        -------------------------------------------------------------------------- */}
          <Container className='pt-5' >
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
        <ScrollToTop />
      </Container>
    </>
  )
}

export default App