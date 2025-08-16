import React from 'react'
import { Navbar, Container, Nav, NavLink } from 'react-bootstrap'
import DarkModeToggle from './DarkModeToggle'
import logo from '../../assets/logo.svg'

function NavBar({ handleShow }) {
    return (
        <Navbar className='navBar bg-dark-subtle sticky-top shadow'>
            <Container fluid className=''>
                <Navbar.Brand className='d-flex align-items-center py-0'>
                    <img
                        alt="logo"
                        src={logo}
                        height="35"
                        className="logo object-fit-contain"
                    />
                    <span className='h3 mb-0 ms-2'>GPA Calculator</span>
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