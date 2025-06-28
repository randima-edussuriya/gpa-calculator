import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import { getCalculateGPA, getClassName, getTotalCredits } from '../utils/gpaUtils'

function StaticCards({ modules, classSystem, gradingSystem }) {
    return (
        <Row className='g-2'>
            <Col xs={6} sm={3} >
                <Container className='staticCard bg-danger-subtle p-2 rounded shadow text-center h-100'>
                    <span className='d-block h5 text-danger'>GPA</span>
                    <span className='d-block h4'>{getCalculateGPA(modules, gradingSystem)}</span>
                </Container>
            </Col>
            <Col xs={6} sm={3} >
                <Container className='staticCard bg-info-subtle p-2 rounded shadow text-center h-100'>
                    <span className='d-block h5 text-primary'>Class</span>
                    <span className='d-block h4'>{getClassName(getCalculateGPA(modules, gradingSystem), classSystem)}</span>
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
                    <span className='d-block h4'>{getTotalCredits(modules)}</span>
                </Container>
            </Col>
        </Row>
    )
}

export default StaticCards