import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import DarkModeToggle from './DarkModeToggle'

function NavBar({ handleShow }) {
    return (
        <Navbar className='navBar bg-dark-subtle sticky-top shadow'>
            <Container fluid className=''>
                <Navbar.Brand >
                    <span className='h3'>GPA Calculator</span>
                </Navbar.Brand>
                <Nav className="ms-auto gap-3">
                    <DarkModeToggle />
                    <i className="navIcon bi bi-question-circle fs-2" onClick={handleShow}></i>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavBar