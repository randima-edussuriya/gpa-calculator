import React, { useState } from 'react'
import { Col, Container, Form, Row, Button, Table, Image } from 'react-bootstrap'
import './App.css'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import gpaFormular from './assets/gpa formular.png'

function App() {
  const gradingSystem = [
    { marksRange: '85 and above', grade: 'A+', gradePoint: 4.2 },
    { marksRange: '75 to 84', grade: 'A', gradePoint: 4.0 },
    { marksRange: '70 to 74', grade: 'A-', gradePoint: 3.7 },
    { marksRange: '65 to 69', grade: 'B+', gradePoint: 3.3 },
    { marksRange: '60 to 64', grade: 'B', gradePoint: 3.0 },
    { marksRange: '55 to 59', grade: 'B-', gradePoint: 2.7 },
    { marksRange: '50 to 54', grade: 'C+', gradePoint: 2.3 },
    { marksRange: '45 to 49', grade: 'C', gradePoint: 2.0 },
    { marksRange: '40 to 44', grade: 'C-', gradePoint: 1.5 },
    { marksRange: '35 to 39', grade: 'D', gradePoint: 1.0 },
    { marksRange: '34 and below', grade: 'I', gradePoint: 0.0 },
    { marksRange: '-----', grade: 'F', gradePoint: 0.0 },
    { marksRange: '-----', grade: 'T', gradePoint: 0.0 },
  ]

  const classSystem = [
    { name: 'First Class', min: 3.70, max: null },
    { name: 'Second Class – Upper Division', min: 3.30, max: 3.69 },
    { name: 'Second Class – Lower Division', min: 3.00, max: 3.29 },
    { name: 'Pass', min: 2.00, max: 2.99 },
  ]

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
      // icon: "warning",
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

  const getGradePoint = (grade) => {
    const found = gradingSystem.find(item => item.grade === grade);
    return parseFloat(found?.gradePoint) ?? 0;
  }

  const getTotalCredits = () => {
    return modules.reduce((sum, module) => (sum + module.credit), 0)
  }

  const getCalculateGPA = () => {
    const totalCreditsAndGradePoint = modules.reduce((sum, module) => (sum + (module.credit * getGradePoint(module.grade))), 0);
    const totalCredits = getTotalCredits();
    console.log(totalCredits);
    return totalCredits > 0 ? (totalCreditsAndGradePoint / totalCredits).toFixed(2) : 0;
  }

  const getClassName = (gpa) => {
    const foundClass = classSystem.find(item => {
      const isMinOk = gpa >= item.min;
      const isMaxOk = item.max === null ? true : gpa <= item.max;
      return isMinOk && isMaxOk;
    })
    return foundClass?.name ?? 'Not Pass';
  }


  return (
    <Container fluid className='bg-dark-subtle d-flex flex-column min-vh-100'>
      <Container className='flex-grow-1'>
        {/* ----------------------------------------------------------------------
              Add module section
        -------------------------------------------------------------------------- */}
        <Container className='pt-3' >
          <h2 className='text-center my-3'>GPA Calculator</h2>
          <Form onSubmit={handleSubmit}>
            <Row className="align-items-center g-2 justify-content-center">
              <Col md='6'>
                <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                  Module Title
                </Form.Label>
                <Form.Control
                  id="inlineFormInput"
                  type='text'
                  name='moduleTitle'
                  placeholder="Module Title"
                  value={formData.moduleTitle}
                  onChange={handleChange}

                />
              </Col>
              <Col md='auto'>
                <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                  Credit
                </Form.Label>
                <Form.Control
                  id="inlineFormInput"
                  type='number'
                  name='credit'
                  placeholder="Credit"
                  min='0'
                  value={formData.credit}
                  onChange={handleChange}

                />
              </Col>
              <Col md="auto">
                <Form.Select aria-label="Default select example" name='grade' value={formData.grade} onChange={handleChange} >
                  <option value=''>Select Grade</option>
                  {
                    gradingSystem.map((row, index) => (
                      <option value={row.grade} key={index}>{row.grade}</option>
                    ))
                  }
                </Form.Select>
              </Col>
              <Col md="auto">
                <Button variant='dark' type="submit">
                  Add Module
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>

        {modules.length !== 0 && (
          <>
            {/* ----------------------------------------------------------------------
              Statics Section
            -------------------------------------------------------------------------- */}
            <Container className='mt-4'>
              <Row className='g-2'>
                <Col xs={6} sm={3} >
                  <Container className='staticCard bg-danger-subtle p-2 rounded shadow text-center h-100'>
                    <span className='d-block h5 text-danger'>GPA</span>
                    <span className='d-block h4'>{getCalculateGPA()}</span>
                  </Container>
                </Col>
                <Col xs={6} sm={3} >
                  <Container className='staticCard bg-info-subtle p-2 rounded shadow text-center h-100'>
                    <span className='d-block h5 text-primary'>Class</span>
                    <span className='d-block h4'>{getClassName(getCalculateGPA())}</span>
                  </Container>
                </Col>
                <Col xs={6} sm={3} >
                  <Container className='staticCard bg-warning-subtle p-2 rounded shadow text-center h-100'>
                    <span className='d-block h5 text-warning-emphasis'>No of Modules</span>
                    <span className='d-block h4'>{modules.length}</span>
                  </Container>
                </Col>
                <Col xs={6} sm={3} >
                  <Container className='staticCard bg-light-subtle p-2 rounded shadow text-center h-100'>
                    <span className='d-block h5 text-muted'>Total Credits</span>
                    <span className='d-block h4'>{getTotalCredits()}</span>
                  </Container>
                </Col>
              </Row>
            </Container>
            {/* ----------------------------------------------------------------------
              Modules Tabel Section
            -------------------------------------------------------------------------- */}
            <Container className='mt-4'>
              <Table responsive striped hover className='rounded overflow-hidden shadow'>
                <thead>
                  <tr>
                    <th>Module Title</th>
                    <th>Credit</th>
                    <th>Grade</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {modules.map((module, index) => (
                    <tr key={index}>
                      <td className=''>{module.moduleTitle}</td>
                      <td>{module.credit}</td>
                      <td>{module.grade}</td>
                      <td>
                        <i className="bi bi-x-lg removeIcon" onClick={() => handleRemove(index)}></i>
                      </td>
                    </tr>
                  ))}

                </tbody>
              </Table>
            </Container>
          </>
        )}
        {/* ----------------------------------------------------------------------
              Grading System, Awarding of classes, GPA Formular section
        -------------------------------------------------------------------------- */}
        <Container className='mt-4'>
          <Row className='g-3'>
            {/* ----------------------------------------------------------------------
                  Grading System
            -------------------------------------------------------------------------- */}
            <Col xs={12} sm={6}>
              <Container className='bg-info-subtle rounded shadow'>
                <h4 className='text-center pt-2'>Grading System</h4>
                <Table responsive striped hover className='rounded overflow-hidden'>
                  <thead>
                    <tr>
                      <th>Marks Range</th>
                      <th>Grade</th>
                      <th>Grade Point</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gradingSystem.map(row => (
                      <tr>
                        <td>{row.marksRange}</td>
                        <td>{row.grade}</td>
                        <td>{row.gradePoint.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Container>
            </Col>
            <Col xs={12} sm={6}>
              <Container className='px-0'>
                {/* ----------------------------------------------------------------------
                      Awarding of classes
                -------------------------------------------------------------------------- */}
                <Container className='bg-success-subtle rounded shadow'>
                  <h4 className='text-center pt-2'>Awarding of classes</h4>
                  <Table responsive striped hover className='rounded overflow-hidden'>
                    <thead>
                      <tr>
                        <th>GPA Range</th>
                        <th>Class</th>
                      </tr>
                    </thead>
                    <tbody>
                      {classSystem.map(row => (
                        <tr>
                          {row.max === null ? (
                            <td>{row.min.toFixed(2)} or above</td>
                          ) : (
                            <td>{row.min.toFixed(2)} - {row.max.toFixed(2)}</td>)
                          }
                          <td>{row.name}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Container>
                {/* ----------------------------------------------------------------------
                      GPA Formular
                -------------------------------------------------------------------------- */}
                <Container className='justify-content-center align-items-center text-center bg-body-secondary mt-3 rounded shadow pt-2 pb-3'>
                  <h4>GPA Formular</h4>
                  <Image fluid rounded src={gpaFormular} className='bg-light p-3' width='300px' />
                  <p className='text-start mt-2'><span className='fs-5 fw-medium'>n<sub>i</sub></span> is the number of credits for the <span className='fs-5 fw-medium'>i<sup>th</sup></span> course module and <span className='fs-5 fw-medium'>g<sub>i</sub></span> is the grade point earned for that course module.</p>
                </Container>
              </Container>
            </Col>
          </Row>
        </Container>
      </Container>
      {/* ----------------------------------------------------------------------
              Footer Section
        -------------------------------------------------------------------------- */}
      <footer className='py-2 border-top border-4 mt-5'>
        &copy; 2025 GPA Calculator | Developed by <a href='https://github.com/randima-edussuriya' target='_blank' className='text-reset'>Randima Edussuriya</a>
      </footer>
    </Container>
  )
}

export default App