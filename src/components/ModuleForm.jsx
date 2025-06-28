import React from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'

function ModuleForm({ formData, gradingSystem, handleSubmit, handleChange }) {
    return (
        <>
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
            </Form></>
    )
}

export default ModuleForm