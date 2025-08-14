import React from 'react'

function Footer() {
    return (
        <footer className='py-2 border-top border-4 mt-5'>
            &copy; {new Date().getFullYear()} GPA Calculator
            | View on{' '}
            <a
                href="https://github.com/randima-edussuriya/gpa-calculator"
                target='_blank'
                rel='noopener noreferrer'
                className='text-reset'
            >
                <i className="bi bi-github fs-5" title='GitHub'></i>
            </a>
            {' '}| Developed by{' '}
            <a
                href='https://github.com/randima-edussuriya'
                target='_blank'
                rel='noopener noreferrer'
                className='text-reset'>
                Randima Edussuriya
            </a>
        </footer>
    )
}

export default Footer