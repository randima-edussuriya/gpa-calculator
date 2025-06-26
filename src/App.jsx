import React, { useState } from 'react'
import { Col, Container, Form, Row, Button, Table } from 'react-bootstrap'
import './App.css'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

function App() {
  const gradingSystem = [
    { grade: 'A+', gradePoint: 4.2 },
    { grade: 'A', gradePoint: 4.0 },
    { grade: 'A-', gradePoint: 3.7 },
    { grade: 'B+', gradePoint: 3.3 },
    { grade: 'B', gradePoint: 3.0 },
    { grade: 'B-', gradePoint: 2.7 },
    { grade: 'C+', gradePoint: 2.3 },
    { grade: 'C', gradePoint: 2.0 },
    { grade: 'C-', gradePoint: 1.5 },
    { grade: 'D', gradePoint: 1.0 },
    { grade: 'I', gradePoint: 0.0 },
    { grade: 'F', gradePoint: 0.0 },
    { grade: 'T', gradePoint: 0.0 },
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
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#212529",
      cancelButtonColor: "#d33",
      confirmButtonText: "Remove",
      width: '20em'
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

  const calculateGPA = () => {
    const totalCreditsAndGradePoint = modules.reduce((sum, module) => (sum + (module.credit * getGradePoint(module.grade))), 0);
    const totalCredits = modules.reduce((sum, module) => (sum + module.credit), 0)
    console.log(totalCredits);
    return totalCredits > 0 ? (totalCreditsAndGradePoint / totalCredits).toFixed(2) : 0;
  }

  return (
    <Container fluid className='bg-dark-subtle d-flex flex-column min-vh-100'>
      <Container className='flex-grow-1'>
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
                  step='0.1'
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
                    <td>{module.moduleTitle}</td>
                    <td>{module.credit}</td>
                    <td>{module.grade}</td>
                    <td>
                      <i className="bi bi-x-lg removeIcon" onClick={() => handleRemove(index)}></i>
                    </td>
                  </tr>
                ))}

              </tbody>
            </Table>
            <h4 className='text-center mt-3 text-bg-light py-2 rounded shadow'>GPA : {calculateGPA()}</h4>
          </Container>
        )}
      </Container>
      <footer className='py-2 text-muted border-top'>
        &copy; 2025 GPA Calculator | Developed by <a href='#' className='text-reset'>Randima Edussuriya</a>
      </footer>
    </Container>
  )
}

export default App