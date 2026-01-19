import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container navbar-content">
                <Link to="/" className="navbar-logo">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <path
                            d="M16 2C16 2 10 8 10 14C10 17.866 13.134 21 17 21C20.866 21 24 17.866 24 14C24 8 18 2 18 2C18 2 17 3 16 2Z"
                            fill="currentColor"
                            opacity="0.7"
                        />
                        <path
                            d="M17 21C17 21 14 23 14 26C14 28.209 15.791 30 18 30C20.209 30 22 28.209 22 26C22 23 19 21 19 21C19 21 18 21.5 17 21Z"
                            fill="currentColor"
                        />
                    </svg>
                    PlantCare AI
                </Link>

                <ul className="navbar-links">
                    <li>
                        <Link
                            to="/"
                            className={location.pathname === '/' ? 'active' : ''}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/home"
                            className={location.pathname === '/home' ? 'active' : ''}
                        >
                            Detect Disease
                        </Link>
                    </li>
                </ul>

                <button className="navbar-toggle" aria-label="Toggle menu">
                    <span>☰</span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
