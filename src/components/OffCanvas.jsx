import React from 'react'
import { Offcanvas } from 'react-bootstrap'

function OffCanvas({ show, handleClose }) {
    return (
        <Offcanvas show={show} placement='end' scroll onHide={handleClose} className="bg-body-secondary">
            <Offcanvas.Header closeButton>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <h5>Privacy Policy</h5>
                <p>We respect your privacy. This GPA Calculator does not collect, store, or share any data you enter on our servers. All information is stored only in your browser’s local storage. Your added modules remain available even after refreshing or reopening the page, until you manually remove them or clear your browser data.</p>
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default OffCanvas