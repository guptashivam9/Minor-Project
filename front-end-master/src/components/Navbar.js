import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar () {
    const [click, setClick] = useState(false); 

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo
                    ">
                        JodiFinder<i className="fab fa-typo3"></i>
                    </Link>
                    <div className="menu-icon" onClick={closeMobileMenu}>
                        <i className={click ? 'fas-fa-times': 'fas fa-bars'} />
                        </div>
                        </div> 
                        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                            <li className="nav-item">
                                <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/about" className="nav-links" onClick={closeMobileMenu}>
                                    About
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/contact" className="nav-links" onClick={closeMobileMenu}>
                                    Contact
                                </Link>

                                </li>
                            </ul>
                            <li className="nav-item">
                                <Link to="/login" className="nav-links" onClick={closeMobileMenu}>
                                    Login
                                </Link>
                                </li>
                            <li className="nav-item">
                                <Link to="/sign-up" className="nav-links-mobile" onClick={closeMobileMenu}>
                                    Sign Up
                                    </Link>
                                    </li>
                                    
                        
            </nav>
        </>
    );
}
export default Navbar;