import React from 'react'
import gpaFormular from '../assets/gpa formular-1.png'
import { Row, Col, Container, Table, Image } from 'react-bootstrap'

function GradingAndOtherSystem({ gradingSystem, classSystem }) {
    return (
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
                                <tr key={row.grade}>
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
                                    <tr key={row.name}>
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
    )
}

export default GradingAndOtherSystem