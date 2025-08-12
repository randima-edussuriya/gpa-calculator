import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'

function ScrollToTop() {
    const [isVisible, setTsVisible] = useState(false)

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }
    useEffect(() => {
        const toggleVisibilty = () => {
            if (window.scrollY > 200) {
                setTsVisible(true);
            } else {
                setTsVisible(false);
            }
        }

        // when user scrolls, toggleVisibility is called.
        window.addEventListener('scroll', toggleVisibilty);
        // useEffect cleanup function.
        return () => window.removeEventListener('scroll', toggleVisibilty);
    }, [])
    return (
        isVisible && (
            <Container fluid className='fixed-bottom text-end'>
                <Button
                    onClick={scrollToTop}
                    variant='dark'
                    className='btnScrolToTop shadow mb-5 me-1 opacity-75'
                    aria-label="Scroll to top"
                >
                    <i className="bi bi-arrow-up"></i>
                </Button>
            </Container>
        )
    )
}

export default ScrollToTop