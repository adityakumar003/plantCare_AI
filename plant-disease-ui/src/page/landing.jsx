import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Landing = () => {
    return (
        <div className="app">
            <Navbar />

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Protect Your Plants with AI-Powered Disease Detection
                    </h1>
                    <p className="hero-subtitle">
                        Upload a photo of your plant and get instant, accurate disease diagnosis
                        with treatment recommendations powered by advanced machine learning.
                    </p>
                    <div className="hero-buttons">
                        <Link to="/home" className="btn btn-primary">
                            Start Detection
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                        <a href="#features" className="btn btn-secondary">
                            Learn More
                        </a>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="features">
                <div className="container">
                    <h2 style={{ textAlign: 'center' }}>Why Choose PlantCare AI?</h2>
                    <p style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto', marginBottom: '2rem' }}>
                        Our advanced AI system helps you identify and treat plant diseases quickly and accurately.
                    </p>

                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                    <path d="M16 4L4 10L16 16L28 10L16 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M4 22L16 28L28 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M4 16L16 22L28 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h3 className="feature-title">Advanced AI Model</h3>
                            <p className="feature-description">
                                Trained on thousands of plant images, our deep learning model provides
                                highly accurate disease detection across multiple plant species.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                    <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="2" />
                                    <path d="M16 8V16L20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </div>
                            <h3 className="feature-title">Instant Results</h3>
                            <p className="feature-description">
                                Get disease identification and confidence scores in seconds.
                                No waiting, no complicated processes - just upload and analyze.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                    <rect x="6" y="6" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="2" />
                                    <path d="M12 16L15 19L20 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h3 className="feature-title">Treatment Guidance</h3>
                            <p className="feature-description">
                                Receive detailed treatment recommendations and preventive measures
                                to help your plants recover and stay healthy.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                    <path d="M16 2C16 2 10 8 10 14C10 17.866 13.134 21 17 21C20.866 21 24 17.866 24 14C24 8 18 2 18 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    <path d="M17 21C17 21 14 23 14 26C14 28.209 15.791 30 18 30C20.209 30 22 28.209 22 26C22 23 19 21 19 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </div>
                            <h3 className="feature-title">Multiple Diseases</h3>
                            <p className="feature-description">
                                Detect a wide range of plant diseases including fungal infections,
                                bacterial diseases, viral infections, and nutrient deficiencies.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                    <rect x="4" y="4" width="24" height="24" rx="3" stroke="currentColor" strokeWidth="2" />
                                    <circle cx="16" cy="14" r="4" stroke="currentColor" strokeWidth="2" />
                                    <path d="M10 26C10 23 12.686 20 16 20C19.314 20 22 23 22 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </div>
                            <h3 className="feature-title">Easy to Use</h3>
                            <p className="feature-description">
                                Simple, intuitive interface designed for everyone - from home gardeners
                                to professional farmers. No technical knowledge required.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                    <path d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" stroke="currentColor" strokeWidth="2" />
                                    <path d="M16 12V16L19 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </div>
                            <h3 className="feature-title">24/7 Availability</h3>
                            <p className="feature-description">
                                Access our plant disease detection service anytime, anywhere.
                                Your plants don't wait for business hours, and neither do we.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="hero" style={{ minHeight: '60vh', background: 'linear-gradient(135deg, #2d6a4f 0%, #1a4d2e 100%)' }}>
                <div className="hero-content">
                    <h2 style={{ color: 'white' }}>Ready to Protect Your Plants?</h2>
                    <p style={{ color: '#cad2c5', fontSize: '1.125rem', marginBottom: '2rem' }}>
                        Join thousands of gardeners and farmers using AI to keep their plants healthy.
                    </p>
                    <Link to="/home" className="btn" style={{ background: 'white', color: '#2d6a4f' }}>
                        Get Started Now
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Landing;
