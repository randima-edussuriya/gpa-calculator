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
    e.preventDefault();
    if (!formData.moduleTitle || !formData.credit | !formData.grade) {
      toast.error('Please fill all fields', { autoClose: 2500 })
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

  const handleRemove = (index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#212529",
      cancelButtonColor: "#d33",
      confirmButtonText: "Remove",
      width: '17em'
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedModules = [...modules];
        updatedModules.splice(index, 1);
        setModules(updatedModules);
      }
    });

  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container fluid className='bg-dark-subtle d-flex flex-column min-vh-100 position-relative'>
      {/* ----------------------------------------------------------------------
              Offcanvas for Privacy Policy
        -------------------------------------------------------------------------- */}
      <OffCanvas handleShow={handleShow} show={show} handleClose={handleClose} />

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