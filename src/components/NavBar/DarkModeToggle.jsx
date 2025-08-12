import React, { useEffect, useState } from 'react'

function DarkModeToggle() {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        document.body.setAttribute('data-bs-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme])

    const handleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light')
    }
    return (
        <>
            {theme === 'light' ? (
                <i className="bi bi-moon fs-2 navIcon" onClick={handleTheme}></i>
            ) : (
                <i className="bi bi-brightness-high fs-2 navIcon" onClick={handleTheme}></i>
            )}
        </>
    )
}

export default DarkModeToggle