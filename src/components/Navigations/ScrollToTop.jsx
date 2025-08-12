import React from 'react'
import { Button, Container } from 'react-bootstrap'

function ScrollToTop() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    return (
        <Container fluid className='fixed-bottom text-end'>
            <Button
                onClick={scrollToTop}
                variant='light'
                className='btnScrolToTop shadow mb-3 me-1 border-0'
                aria-label="Scroll to top"
            >
                <i className="bi bi-arrow-up"></i>
            </Button>
        </Container>
    )
}

export default ScrollToTop