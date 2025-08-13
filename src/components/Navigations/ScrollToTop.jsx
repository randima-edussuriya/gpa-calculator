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
            <Button
                onClick={scrollToTop}
                variant='dark'
                className='position-fixed btnScrolToTop rounded-circle shadow opacity-50'
                aria-label="Scroll to top"
            >
                <i className="bi bi-arrow-up"></i>
            </Button>
        )
    )
}

export default ScrollToTop