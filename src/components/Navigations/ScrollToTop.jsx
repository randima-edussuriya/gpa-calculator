import React from 'react'
import { Button, Container } from 'react-bootstrap'

function ScrollToTop() {
    return (
        <Container fluid className='fixed-bottom text-end'>
            <Button
                variant='light'
                // size='lg'
                className='btnScrolToTop shadow mb-3 me-1 border-0'
                aria-label="Scroll to top"
            >
                <i className="bi bi-arrow-up"></i>
            </Button>
        </Container>
    )
}

export default ScrollToTop