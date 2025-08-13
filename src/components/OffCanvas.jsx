import React from 'react'
import { Offcanvas } from 'react-bootstrap'

function OffCanvas({ show, handleClose }) {
    return (
        <Offcanvas show={show} placement='end' scroll onHide={handleClose} className="bg-body-secondary">
            <Offcanvas.Header closeButton>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <h5>Privacy Policy</h5>
                <p>We respect your privacy. This GPA Calculator does not collect, store, or share any data you enter. All information stays in your browser and is cleared when you refresh or close the page.</p>
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default OffCanvas