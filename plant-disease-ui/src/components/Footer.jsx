import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>PlantCare AI</h3>
                        <p>
                            Advanced plant disease detection powered by artificial intelligence.
                            Helping farmers and gardeners protect their crops.
                        </p>
                    </div>

                    <div className="footer-section">
                        <h3>Quick Links</h3>
                        <ul className="footer-links">
                            <li><a href="/">Home</a></li>
                            <li><a href="/home">Detect Disease</a></li>
                            <li><a href="#about">About Us</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h3>Resources</h3>
                        <ul className="footer-links">
                            <li><a href="#guide">User Guide</a></li>
                            <li><a href="#diseases">Disease Database</a></li>
                            <li><a href="#faq">FAQ</a></li>
                            <li><a href="#support">Support</a></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h3>Connect</h3>
                        <ul className="footer-links">
                            <li><a href="#github">GitHub</a></li>
                            <li><a href="#twitter">Twitter</a></li>
                            <li><a href="#linkedin">LinkedIn</a></li>
                            <li><a href="#email">Email Us</a></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {currentYear} PlantCare AI. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
